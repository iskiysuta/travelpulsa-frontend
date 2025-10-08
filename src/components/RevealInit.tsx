'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

function initRevealOnce() {
	if (typeof window === 'undefined') return;
	const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
	if (!('IntersectionObserver' in window)) {
		elements.forEach((el) => el.classList.add('reveal-show'));
		return;
	}
	const io = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const el = entry.target as HTMLElement;
					const delay = Number(el.dataset.delay || '0');
					setTimeout(() => el.classList.add('reveal-show'), delay);
					io.unobserve(el);
				}
			});
		},
		{ threshold: 0.15 }
	);
	elements.forEach((el) => io.observe(el));

	// Observe dynamically added elements so async content (e.g., fetched lists) is handled
	const mo = new MutationObserver((mutations) => {
		mutations.forEach((m) => {
			m.addedNodes.forEach((n) => {
				if (!(n instanceof Element)) return;
				if (n.classList?.contains('reveal')) io.observe(n as HTMLElement);
				// Also scan descendants
				n.querySelectorAll?.('.reveal')?.forEach((el) => io.observe(el as HTMLElement));
			});
		});
	});
	mo.observe(document.body, { childList: true, subtree: true });
	return () => {
		io.disconnect();
		mo.disconnect();
	};
}

export default function RevealInit() {
	const pathname = usePathname();
	useEffect(() => {
		// Run after route change and after DOM paint
		let cleanup: (() => void) | undefined;
		const id = window.requestAnimationFrame(() => {
			const res = initRevealOnce();
			if (typeof res === 'function') cleanup = res as any;
		});
		return () => {
			window.cancelAnimationFrame(id);
			cleanup?.();
		};
	}, [pathname]);
	return null;
}


