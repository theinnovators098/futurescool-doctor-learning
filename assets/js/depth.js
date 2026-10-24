(() => {
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
    const root = document.documentElement;

    // Scroll progress bar.
    const progress = document.querySelector('.scroll-progress');
    const onScroll = () => {
        const max = root.scrollHeight - innerHeight;
        progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // 3D scroll reveals, staggered within each group.
    const groups = ['.intro-grid > *', '.section-heading > *', '.course-card', '.approach-intro', '.approach-list article', '.faculty-card', '.enroll-content > div', '.faq-heading', '.faq-list details'];
    const revealables = [];
    groups.forEach((selector) => document.querySelectorAll(selector).forEach((element, index) => {
        element.classList.add('reveal');
        element.style.setProperty('--delay', `${index * 90}ms`);
        revealables.push(element);
    }));
    if (reduceMotion || !('IntersectionObserver' in window)) {
        revealables.forEach((element) => element.classList.add('is-visible'));
    } else {
        const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }), { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
        revealables.forEach((element) => observer.observe(element));
    }

    if (reduceMotion || !finePointer) return;

    // Tilt a surface toward the pointer and move its glare highlight.
    const tilt = (element, strength) => {
        element.addEventListener('pointermove', (event) => {
            const box = element.getBoundingClientRect();
            const x = (event.clientX - box.left) / box.width;
            const y = (event.clientY - box.top) / box.height;
            element.classList.add('is-tilting');
            element.style.setProperty('--rx', `${(0.5 - y) * strength}deg`);
            element.style.setProperty('--ry', `${(x - 0.5) * strength}deg`);
            element.style.setProperty('--gx', `${x * 100}%`);
            element.style.setProperty('--gy', `${y * 100}%`);
        });
        element.addEventListener('pointerleave', () => {
            element.classList.remove('is-tilting');
            element.style.setProperty('--rx', '0deg');
            element.style.setProperty('--ry', '0deg');
        });
    };
    document.querySelectorAll('.course-card').forEach((card) => tilt(card, 16));
    document.querySelectorAll('.faculty-card, .course-dialog').forEach((card) => tilt(card, 5));

    // The hero art floats as a layered 3D stage that follows the pointer.
    const stage = document.querySelector('.hero-stage');
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
    addEventListener('pointermove', (event) => {
        targetX = event.clientX / innerWidth - 0.5;
        targetY = event.clientY / innerHeight - 0.5;
    }, { passive: true });
    const animateStage = () => {
        currentX += (targetX - currentX) * 0.07;
        currentY += (targetY - currentY) * 0.07;
        stage.style.transform = `rotateY(${currentX * 18}deg) rotateX(${-currentY * 14}deg)`;
        requestAnimationFrame(animateStage);
    };
    animateStage();
})();
