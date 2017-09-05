/// <reference types="node" />

export function getStdIn(): Promise<string> {
    const ret: Buffer[] = [];
    const stdin = process.stdin;
	let len = 0;

	return new Promise<string>(resolve => {
		if (stdin.isTTY) {
			resolve('');
		} else {
            stdin.on('readable', () => {
                let chunk: Buffer;

                while ((chunk = stdin.read() as Buffer)) {
                    ret.push(chunk);
                    len += chunk.length;
                }
            });

            stdin.on('end', () => {
                resolve(Buffer.concat(ret, len).toString('utf8'));
            });
        }
	});
}
