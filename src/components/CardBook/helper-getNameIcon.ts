export function getNameIcon(str: string | null | undefined): string {
	if (!str) return "КЛ";
	const nameIcon = str.trim().slice(0, 2).toUpperCase();
	return nameIcon;
}