import { spawn } from 'child_process';
import { existsSync } from 'fs';
import { mkdir, rename, unlink } from 'fs/promises';
import path from 'path';
import { create } from 'tar';

type RunResult = { code: number; stdout: string; stderr: string };

const run = async (
  cmd: string,
  args: string[],
  cwd: string,
): Promise<RunResult> =>
  new Promise<RunResult>((resolve, reject) => {
    const child = spawn(cmd, args, {
      cwd,
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: false,
    });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (d: Buffer) => {
      stdout += d.toString('utf8');
    });
    child.stderr.on('data', (d: Buffer) => {
      stderr += d.toString('utf8');
    });
    child.on('error', (err: Error) => {
      reject(err);
    });
    child.on('close', (code) => {
      resolve({ code: code ?? 0, stdout, stderr });
    });
  });

const main = async (): Promise<void> => {
  const root = await run(
    'git',
    ['rev-parse', '--show-toplevel'],
    process.cwd(),
  );
  const repoRoot = root.code === 0 ? root.stdout.trim() : process.cwd();

  const outDirRel = 'context';
  const outDirAbs = path.join(repoRoot, outDirRel);
  await mkdir(outDirAbs, { recursive: true });

  const list = await run(
    'git',
    ['ls-files', '-z', '--cached', '--others', '--exclude-standard'],
    repoRoot,
  );
  if (list.code !== 0) {
    console.log('archive: no file list; left context directory in place');
    process.exitCode = 1;
    return;
  }

  const allRel = list.stdout.split('\u0000').filter((f) => f.length > 0);
  const filesRel = allRel.filter(
    (p) => !p.startsWith('context/') && existsSync(path.join(repoRoot, p)),
  );

  const archiveRel = 'context/archive.tar';
  const archiveAbs = path.join(repoRoot, archiveRel);
  const tmpAbs = `${archiveAbs}.tmp`;
  if (existsSync(tmpAbs)) await unlink(tmpAbs);

  try {
    await create(
      {
        cwd: repoRoot,
        file: tmpAbs,
        portable: false,
        noMtime: true,
        preservePaths: false,
      },
      filesRel,
    );
    await rename(tmpAbs, archiveAbs);
    console.log(
      `archive: wrote ${archiveRel} (${filesRel.length.toString()} files)`,
    );
  } catch {
    process.exitCode = 1;
  }
};

void main();
