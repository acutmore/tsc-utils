/// <reference types="node" />

export function consume(stream: NodeJS.ReadStream): Promise<string> {
    const ret: Buffer[] = [];
	let len = 0;

	return new Promise<string>(resolve => {
		if (stream.isTTY) {
			resolve('');
		} else {
            stream.on('readable', () => {
                let chunk: Buffer;

                while ((chunk = stream.read() as Buffer)) {
                    ret.push(chunk);
                    len += chunk.length;
                }
            });

            stream.on('end', () => {
                resolve(Buffer.concat(ret, len).toString('utf8'));
            });
        }
	});
}

export function getStdIn(): Promise<string> {
    return consume(process.stdin);
}
