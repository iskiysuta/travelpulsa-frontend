'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

function initRevealOnce() {
	if (typeof window === 'undefined') return;
	const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
	// Simpler, safe behavior: apply reveal immediately without observers to avoid race conditions on route changes
	elements.forEach((el) => el.classList.add('reveal-show'));
	return () => undefined;
}

export default function RevealInit() {
	const pathname = usePathname();
	useEffect(() => {
		// Run after route change and after DOM paint
		let cleanup: (() => void) | undefined;
		const id = window.requestAnimationFrame(() => {
			const res = initRevealOnce();
			if (typeof res === 'function') cleanup = res as (() => void);
		});
		return () => {
			window.cancelAnimationFrame(id);
			cleanup?.();
		};
	}, [pathname]);
	return null;
}


