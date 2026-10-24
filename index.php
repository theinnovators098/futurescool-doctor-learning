<?php
declare(strict_types=1);

$courses = [
    [
        'category' => 'Clinical practice',
        'level' => 'For practicing clinicians',
        'title' => 'AI in Clinical Practice',
        'description' => 'A practical introduction to evaluating and using AI tools in clinical workflows.',
        'duration' => '4 weeks',
        'format' => 'Live online',
        'color' => 'mint',
        'tag' => 'Popular',
        'modules' => ['AI essentials for clinicians', 'Evaluating clinical AI tools', 'Workflow and patient communication', 'Safety, privacy and responsible use'],
    ],
    [
        'category' => 'Research',
        'level' => 'For clinicians and researchers',
        'title' => 'Research Methods for Doctors',
        'description' => 'Build confidence in study design, critical appraisal and turning clinical questions into research.',
        'duration' => '6 weeks',
        'format' => 'Live online',
        'color' => 'lilac',
        'tag' => 'Applied learning',
        'modules' => ['From clinical question to protocol', 'Choosing a study design', 'Reading evidence critically', 'Presenting and sharing findings'],
    ],
    [
        'category' => 'Professional growth',
        'level' => 'For doctors at every career stage',
        'title' => 'Communication in Care',
        'description' => 'Explore practical approaches to clearer conversations with patients, families and care teams.',
        'duration' => '3 weeks',
        'format' => 'Live online',
        'color' => 'peach',
        'tag' => 'Small cohort',
        'modules' => ['Listening and shared decisions', 'Explaining complex information', 'Difficult conversations', 'Working across care teams'],
    ],
];

$safe = static fn(string $value): string => htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#f6f7f4">
    <meta name="description" content="Professional learning for doctors, designed to turn new knowledge into confident practice.">
    <title>Futurescool | Professional learning for doctors</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/site.css">
    <link rel="stylesheet" href="assets/css/depth.css">
    <script type="importmap">{"imports":{"three":"https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js","three/addons/":"https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"}}</script>
    <script type="module" src="assets/js/scene.js"></script>
    <script src="assets/js/depth.js" defer></script>
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<div class="scroll-progress" aria-hidden="true"></div>
<header class="site-header">
    <div class="nav-wrap">
        <a class="brand" href="#top" aria-label="Futurescool home"><span class="brand-mark">f<span>.</span></span><span>futurescool</span></a>
        <button class="menu-toggle" aria-expanded="false" aria-controls="primary-nav" aria-label="Open menu"><span></span><span></span></button>
        <nav class="nav-links" id="primary-nav" aria-label="Main navigation">
            <a href="#courses">Courses</a>
            <a href="#approach">Our approach</a>
            <a href="#faculty">Faculty</a>
            <a href="#faq">FAQs</a>
        </nav>
        <a class="button button-dark nav-cta" href="#courses">Explore courses <span aria-hidden="true">↗</span></a>
    </div>
</header>

<main id="main">
    <section class="hero section-wrap" id="top">
        <canvas class="hero-canvas" id="hero-canvas" aria-hidden="true"></canvas>
        <div class="hero-copy">
            <div class="eyebrow"><span class="eyebrow-dot"></span> FUTURESCOOL FOR DOCTORS</div>
            <h1><span class="line">Keep learning.</span><span class="line"><em>Keep moving</em></span><span class="line">medicine forward.</span></h1>
            <p class="hero-lede">Thoughtful, practical courses for doctors who want to grow their skills and bring new ideas into everyday care.</p>
            <div class="hero-actions">
                <a class="button button-dark" href="#courses">Find your course <span aria-hidden="true">↗</span></a>
                <a class="text-link" href="#approach">How learning works <span aria-hidden="true">↓</span></a>
            </div>
            <div class="hero-note"><span class="mini-avatars"><i>MD</i><i>DR</i><i>+</i></span><span>Designed for curious clinicians<br><b>Wherever you are in your career</b></span></div>
        </div>
        <div class="hero-art" aria-label="Illustration of a doctor's learning journey">
            <div class="hero-stage">
            <div class="art-orbit orbit-one"></div><div class="art-orbit orbit-two"></div>
            <div class="hero-stamp"><span>LEARN<br>WITH<br>PURPOSE</span><b>✳</b></div>
            <div class="learning-card">
                <div class="card-topline"><span class="live-mark"><i></i> LEARNING PATH</span><span class="more-dots">•••</span></div>
                <div class="path-title">Your next<br>chapter in care.</div>
                <div class="path-rule"><span></span></div>
                <div class="path-step"><b>01</b><span><strong>Explore</strong><small>Find a question worth asking</small></span><i>↗</i></div>
                <div class="path-step"><b>02</b><span><strong>Learn</strong><small>Build knowledge with peers</small></span><i>↗</i></div>
                <div class="path-step"><b>03</b><span><strong>Apply</strong><small>Take ideas into your practice</small></span><i>↗</i></div>
                <div class="path-footer"><span>Curiosity looks good on you.</span><span class="arrow-circle">↗</span></div>
            </div>
            <div class="floating-note note-top"><span class="spark">✳</span><span>Learn for<br><b>real practice</b></span></div>
            <div class="floating-note note-bottom"><span class="note-icon">↗</span><span>Small steps.<br><b>Meaningful growth.</b></span></div>
            </div>
        </div>
        <div class="hero-bottomline"><span>CONTINUING PROFESSIONAL LEARNING</span><span>MADE FOR THE WAY DOCTORS LEARN <b>✳</b></span></div>
    </section>

    <section class="intro-band">
        <div class="section-wrap intro-grid"><p class="section-kicker">A BETTER WAY TO GROW</p><h2>Good medicine keeps<br><em>asking better questions.</em></h2><div class="intro-text"><p>Your work changes. Evidence evolves. And the best learning should help you connect the two.</p><p>Futurescool brings useful ideas, expert guidance and a community of peers together in courses made for busy doctors.</p></div></div>
    </section>

    <section class="courses section-wrap" id="courses">
        <div class="section-heading">
            <div><p class="section-kicker">EXPLORE THE LEARNING</p><h2>Courses for your<br><em>next step.</em></h2></div>
            <div class="course-intro"><p>Choose a subject that matters to your practice, your curiosity or the direction you want to take next.</p><span class="sample-label">Sample course concepts · confirm details before launch</span></div>
        </div>
        <div class="course-grid">
            <?php foreach ($courses as $index => $course): ?>
                <article class="course-card course-<?= $safe($course['color']) ?>">
                    <div class="course-visual visual-<?= $safe($course['color']) ?>">
                        <span class="course-number">0<?= $index + 1 ?></span><span class="course-tag"><?= $safe($course['tag']) ?></span>
                        <?php if ($index === 0): ?>
                            <div class="visual-ai"><span class="ai-orbit"></span><span class="ai-core">AI</span><i>✳</i><b>+</b><small>CARE</small></div>
                        <?php elseif ($index === 1): ?>
                            <div class="visual-research"><div class="chart-lines"><i></i><i></i><i></i><i></i><i></i></div><span>QUESTION<br><b>→ INSIGHT</b></span><small>RESEARCH NOTES · 01</small></div>
                        <?php else: ?>
                            <div class="visual-comm"><span class="bubble bubble-one">listen</span><span class="bubble bubble-two">understand</span><span class="bubble bubble-three">connect</span><i>↗</i></div>
                        <?php endif; ?>
                        <span class="visual-caption"><?= $safe(strtoupper($course['category'])) ?></span>
                    </div>
                    <div class="course-content"><p class="course-audience"><?= $safe($course['level']) ?></p><h3><?= $safe($course['title']) ?></h3><p class="course-desc"><?= $safe($course['description']) ?></p>
                        <div class="course-meta"><span><i>◷</i> <?= $safe($course['duration']) ?></span><span><i>◎</i> <?= $safe($course['format']) ?></span></div>
                        <button class="course-link" type="button" data-course="<?= $index ?>">Explore course <span>↗</span></button>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>
    </section>

    <section class="approach" id="approach">
        <canvas class="wave-canvas" id="wave-canvas" aria-hidden="true"></canvas>
        <div class="section-wrap approach-grid">
            <div class="approach-intro"><p class="section-kicker">LEARNING THAT FITS REAL LIFE</p><h2>Make room for<br><em>what’s next.</em></h2><p>Professional growth shouldn’t feel like another shift. We make it easier to find focused learning, fit it around your life and carry it into your work.</p><a class="button button-light" href="#courses">See the courses <span aria-hidden="true">↗</span></a></div>
            <div class="approach-list">
                <article><span>01</span><div><h3>Relevant to your work</h3><p>Explore current topics through practical examples and questions from clinical life.</p></div><b>↗</b></article>
                <article><span>02</span><div><h3>Built for busy schedules</h3><p>Clear course information helps you understand the time commitment before you enroll.</p></div><b>↗</b></article>
                <article><span>03</span><div><h3>Learn alongside peers</h3><p>Bring your perspective, learn from others and leave with ideas to keep exploring.</p></div><b>↗</b></article>
                <article><span>04</span><div><h3>Take the next step</h3><p>Connect each course to outcomes you can use in your professional development.</p></div><b>↗</b></article>
            </div>
        </div>
    </section>

    <section class="faculty section-wrap" id="faculty">
        <div class="faculty-card"><div class="faculty-art"><div class="cube-scene" aria-hidden="true"><div class="cube"><span class="face face-front">F<i>✳</i></span><span class="face face-back">✳</span><span class="face face-right">+</span><span class="face face-left">↗</span><span class="face face-top">f<span>.</span></span><span class="face face-bottom">✳</span></div></div><div class="faculty-caption">GOOD LEARNING<br>STARTS WITH<br>GOOD QUESTIONS.</div><span class="faculty-orbit"></span></div><div class="faculty-copy"><p class="section-kicker">PEOPLE WHO MAKE LEARNING MATTER</p><h2>Learn with people<br>who <em>know the work.</em></h2><p>Meet the educators and practitioners behind each course. Their experience, teaching approach and areas of focus should be easy to explore before you enroll.</p><div class="faculty-placeholder"><span>Faculty profiles are being prepared</span><span>→</span></div></div></div>
    </section>

    <section class="enroll-band">
        <div class="section-wrap enroll-content"><div><p class="section-kicker">YOUR NEXT STEP STARTS HERE</p><h2>Curiosity can change<br><em>what comes next.</em></h2></div><div class="enroll-action"><p>Explore the courses and find a subject that fits your goals.</p><a class="button button-dark" href="#courses">Find your course <span aria-hidden="true">↗</span></a><small>Questions? <a href="#faq">Visit our FAQs</a></small></div><span class="enroll-star">✳</span></div>
    </section>

    <section class="faq section-wrap" id="faq">
        <div class="faq-heading"><p class="section-kicker">GOOD TO KNOW</p><h2>Questions before<br><em>you begin?</em></h2></div>
        <div class="faq-list">
            <details><summary>Who are these courses for? <span>+</span></summary><p>The sample course concepts on this prototype are written for doctors and clinicians. Final eligibility requirements should be confirmed on each course page.</p></details>
            <details><summary>How do I know if a course is right for me? <span>+</span></summary><p>Each live course page should include its intended audience, learning outcomes, prerequisites, curriculum and time commitment so you can make an informed choice.</p></details>
            <details><summary>Are courses accredited? <span>+</span></summary><p>Accreditation and continuing education credits vary by course. We will publish these details only when they have been confirmed by the relevant provider.</p></details>
            <details><summary>How do I enroll? <span>+</span></summary><p>Enrollment steps, dates, fees and payment options will be shown on each course page once the program details are finalized.</p></details>
        </div>
    </section>
</main>

<footer class="site-footer"><div class="section-wrap footer-top"><a class="brand brand-footer" href="#top"><span class="brand-mark">f<span>.</span></span><span>futurescool</span></a><p>Thoughtful learning for doctors<br>with somewhere to grow.</p><a class="footer-up" href="#top">Back to top ↑</a></div><div class="section-wrap footer-bottom"><span>© <?= date('Y') ?> Futurescool</span><span>Professional learning for a changing world.</span><div><a href="#courses">Courses</a><a href="#faq">FAQs</a><a href="#top">Privacy</a></div></div></footer>

<dialog class="course-dialog" id="course-dialog" aria-labelledby="dialog-title"><button class="dialog-close" aria-label="Close course details">×</button><p class="section-kicker" id="dialog-kicker">COURSE</p><h2 id="dialog-title"></h2><p id="dialog-description"></p><div class="dialog-facts" id="dialog-facts"></div><h3>Topics to explore</h3><ol id="dialog-modules"></ol><p class="dialog-note">Sample course concept. Confirm curriculum, dates, fees, faculty and accreditation before publishing.</p><a class="button button-dark" href="#courses" id="dialog-cta">Back to courses <span>↗</span></a></dialog>

<script>
const courseData = <?= json_encode($courses, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP) ?>;
const dialog = document.getElementById('course-dialog');
document.querySelectorAll('[data-course]').forEach((button) => button.addEventListener('click', () => {
    const course = courseData[Number(button.dataset.course)];
    document.getElementById('dialog-kicker').textContent = course.category.toUpperCase();
    document.getElementById('dialog-title').textContent = course.title;
    document.getElementById('dialog-description').textContent = course.description;
    const facts = document.getElementById('dialog-facts');
    facts.replaceChildren(...[course.duration, course.format, course.level].map((fact) => {
        const item = document.createElement('span');
        item.textContent = fact;
        return item;
    }));
    const modules = document.getElementById('dialog-modules');
    modules.replaceChildren(...course.modules.map((module) => {
        const item = document.createElement('li');
        item.textContent = module;
        return item;
    }));
    dialog.showModal();
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
const menuButton = document.querySelector('.menu-toggle');
menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    document.querySelector('.nav-links').classList.toggle('is-open', !expanded);
});
document.querySelectorAll('.nav-links a').forEach((link) => link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    document.querySelector('.nav-links').classList.remove('is-open');
}));
</script>
</body>
</html>
