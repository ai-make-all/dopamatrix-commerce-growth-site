import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'

const rootDir = process.cwd()
const [listFileArg = 'review-files.txt', outputFileArg = '_review/review-bundle.txt'] = process.argv.slice(2)
const listFile = path.resolve(rootDir, listFileArg)
const outputFile = path.resolve(rootDir, outputFileArg)
const snapshotDirs = ['pages', 'components', 'data', 'types', 'composables', 'plugins', 'public']
const excludedDirs = new Set(['node_modules', '.nuxt', '.output', 'dist', '.git', '_review'])

function toPosixPath(filePath) {
  return filePath.split(path.sep).join('/')
}

function cleanReviewPath(line) {
  return line.trim().replace(/^["'`]+|["'`]+$/g, '')
}

async function readReviewFiles() {
  const raw = await readFile(listFile, 'utf8')

  return raw
    .replace(/^\uFEFF/, '')
    .split(/\r?\n/)
    .map(cleanReviewPath)
    .filter((line) => line && !line.startsWith('#'))
}

async function scanDirectory(relativeDir, lines) {
  const absoluteDir = path.join(rootDir, relativeDir)

  try {
    const entries = await readdir(absoluteDir, { withFileTypes: true })

    for (const entry of entries) {
      if (excludedDirs.has(entry.name)) {
        continue
      }

      const relativePath = path.join(relativeDir, entry.name)
      const absolutePath = path.join(rootDir, relativePath)

      if (entry.isDirectory()) {
        await scanDirectory(relativePath, lines)
      } else if (entry.isFile()) {
        const fileStat = await stat(absolutePath)
        lines.push(`${toPosixPath(relativePath)} (${fileStat.size} bytes)`)
      }
    }
  } catch (error) {
    if (error?.code === 'ENOENT') {
      lines.push(`Directory not found: ${toPosixPath(relativeDir)}`)
      return
    }

    throw error
  }
}

async function buildSnapshot() {
  const lines = ['===== PROJECT FILE SNAPSHOT =====']

  for (const dir of snapshotDirs) {
    lines.push('', `----- ${dir} -----`)
    await scanDirectory(dir, lines)
  }

  return lines
}

async function buildFileSections(files) {
  const sections = []
  let added = 0
  let missing = 0

  for (const file of files) {
    const absolutePath = path.join(rootDir, file)
    const normalizedPath = toPosixPath(file)

    try {
      const content = await readFile(absolutePath, 'utf8')
      sections.push(`===== FILE: ${normalizedPath} =====`, content.trimEnd(), '')
      added += 1
    } catch (error) {
      if (error?.code === 'ENOENT') {
        sections.push(`===== MISSING: ${normalizedPath} =====`, '')
        missing += 1
        continue
      }

      throw error
    }
  }

  return { sections, added, missing }
}

async function main() {
  const files = await readReviewFiles()
  const snapshot = await buildSnapshot()
  const { sections, added, missing } = await buildFileSections(files)

  const outputLines = [
    '===== REVIEW BUNDLE =====',
    `Generated at: ${new Date().toISOString()}`,
    `List file: ${toPosixPath(path.relative(rootDir, listFile))}`,
    `Output file: ${toPosixPath(path.relative(rootDir, outputFile))}`,
    `File list count: ${files.length}`,
    `Added: ${added}`,
    `Missing: ${missing}`,
    '',
    ...snapshot,
    '',
    '===== CORE FILE CONTENTS =====',
    '',
    ...sections
  ]

  await mkdir(path.dirname(outputFile), { recursive: true })
  await writeFile(outputFile, `${outputLines.join('\n')}\n`, 'utf8')

  console.log(`File list count: ${files.length}`)
  console.log(`Added: ${added}`)
  console.log(`Missing: ${missing}`)
  console.log(`Bundle generated: ${toPosixPath(path.relative(rootDir, outputFile))}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
