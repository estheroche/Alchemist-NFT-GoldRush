export const sizeFormatter = (sizeInBytes: string) => {
    return Number(Number(sizeInBytes) / 1024).toFixed(2);
}

export const shortenAddress = (addr: string) => {
    return `${addr?.substring(0, 6)}...${addr?.substring(addr.length - 4)}`;
};