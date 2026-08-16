/* ============================================================
   APP LOGIC
   ------------------------------------------------------------
   The whole experience is one array of STEPS. Each step knows
   its button label and what to do when it runs. To add, remove,
   or reorder a scene, edit the STEPS array — nothing else needs
   to change. Content (name, colors, poem) comes from config.js.
   ============================================================ */

(function () {
	"use strict";

	const NAME = SITE_CONFIG.name;
	const COLORS = SITE_CONFIG.colors;
	const MESSAGE_LINES = SITE_CONFIG.message.concat(
		[`a very happy birthday, ${NAME}!`]
	);

	/* ---------- apply palette from config.js to CSS variables ---------- */
	const root = document.documentElement;
	Object.entries(COLORS).forEach(([key, value]) => {
		const cssVar = "--" + key.replace(/([A-Z])/g, "-$1").toLowerCase();
		root.style.setProperty(cssVar, value);
	});

	/* ---------- element refs ---------- */
	const $loader = document.getElementById("loader");
	const $bgm = document.getElementById("bgm");
	const $ambient = document.getElementById("ambient");
	const $lightstring = document.getElementById("lightstring");
	const $balloonField = document.getElementById("balloonField");
	const $balloonBorder = document.getElementById("balloonBorder");
	const $banner = document.getElementById("banner");
	const $cake = document.getElementById("cakeImg");
	const $wishHeading = document.getElementById("wishHeading");
	const $storyBox = document.getElementById("storyBox");
	const $storyLine = document.getElementById("storyLine");
	const $advanceBtn = document.getElementById("advanceBtn");
	const $progress = document.getElementById("progress");

	/* ============================================================
	   AMBIENT SPARKLES — decorative, runs the whole time
	   ============================================================ */
	function buildAmbient() {
		const count = window.innerWidth < 480 ? 10 : 18;
		const frag = document.createDocumentFragment();
		for (let i = 0; i < count; i++) {
			const s = document.createElement("span");
			s.className = "ambient__spark";
			s.style.setProperty("--x", Math.random() * 100 + "%");
			s.style.setProperty("--size", 3 + Math.random() * 5 + "px");
			s.style.setProperty("--dur", 9 + Math.random() * 10 + "s");
			s.style.setProperty("--delay", -Math.random() * 18 + "s");
			s.style.setProperty("--drift", (Math.random() * 80 - 40) + "px");
			frag.appendChild(s);
		}
		$ambient.appendChild(frag);
	}

	/* ============================================================
	   FAIRY LIGHT STRING
	   ============================================================ */
	const BULB_COLORS = [
		{ name: "yellow", hex: "#F2B300" },
		{ name: "red",    hex: "#D14D39" },
		{ name: "blue",   hex: "#0719D4" },
		{ name: "green",  hex: "#8FAD00" },
		{ name: "pink",   hex: "#E4779C" },
		{ name: "orange", hex: "#E48A37" }
	];
	let bulbEls = [];

	function buildLightstring() {
		const frag = document.createDocumentFragment();
		bulbEls = BULB_COLORS.map((bulb, i) => {
			const li = document.createElement("li");
			li.className = "lightstring__bulb";
			li.style.setProperty("--bulb-color", bulb.hex);
			li.style.setProperty("--bulb-img", `url('../assets/bulb_${bulb.name}.png')`);
			li.style.setProperty("--flicker-delay", (i * 0.35) + "s");
			frag.appendChild(li);
			return li;
		});
		$lightstring.appendChild(frag);
	}

	function litLights(on) {
		bulbEls.forEach((el, i) => {
			setTimeout(() => el.classList.toggle("is-lit", on), i * 160);
		});
	}

	/* ============================================================
	   BALLOONS — one balloon per letter of "HBD" + NAME.
	   Same balloons are reused for the free-floating rise and
	   later gathered into place to spell the greeting.
	   ============================================================ */
	const LETTERS = ("HBD" + NAME.toUpperCase()).replace(/[^A-Z]/g, "").split("");
	let balloonEls = [];

	function buildBalloons() {
		const frag = document.createDocumentFragment();
		balloonEls = LETTERS.map((letter, i) => {
			const el = document.createElement("div");
			el.className = "balloon";
			el.style.backgroundImage = `url('assets/b${(i % 7) + 1}.png')`;
			el.style.setProperty("--x", (8 + Math.random() * 84) + "%");
			el.style.setProperty("--rise-delay", (Math.random() * 1.4) + "s");
			el.style.setProperty("--rise-to", -(105 + Math.random() * 15) + "vh");
			el.style.setProperty("--rot-start", (Math.random() * 16 - 8) + "deg");
			el.style.setProperty("--rot-end", (Math.random() * 16 - 8) + "deg");
			el.style.setProperty("--drift", (Math.random() * 120 - 60) + "px");
			el.style.setProperty("--spell-top", "42%");

			const label = document.createElement("span");
			label.className = "balloon__label";
			label.textContent = letter;
			el.appendChild(label);

			frag.appendChild(el);
			return el;
		});
		$balloonField.appendChild(frag);
	}

	function flyBalloons() {
		$balloonField.classList.add("is-flying");
		$balloonBorder.classList.add("is-visible");
		setTimeout(() => $balloonBorder.classList.add("is-rising"), 4200);
	}

	function spellGreeting() {
	const n = balloonEls.length;
	const spacing = Math.min(11, 80 / n);
	balloonEls.forEach((el, i) => {
		const offset = (i - (n - 1) / 2) * spacing;
		el.style.setProperty("--spell-left", `calc(50% + ${offset}%)`);
		el.style.setProperty("--spell-top", "26%");
	});
	$balloonField.classList.remove("is-flying");
	$balloonField.classList.add("is-spelling");
}

	/* ============================================================
	   CONFETTI — final celebratory burst
	   ============================================================ */
	function burstConfetti() {
		const palette = [COLORS.rose, COLORS.gold, COLORS.sage, COLORS.roseDeep, COLORS.peach];
		const frag = document.createDocumentFragment();
		for (let i = 0; i < 60; i++) {
			const c = document.createElement("span");
			c.className = "confetti";
			c.style.setProperty("--x", Math.random() * 100 + "%");
			c.style.setProperty("--dur", (2.4 + Math.random() * 1.6) + "s");
			c.style.setProperty("--delay", (Math.random() * 0.6) + "s");
			c.style.setProperty("--spin", (Math.random() * 720 - 360) + "deg");
			c.style.setProperty("--piece-color", palette[i % palette.length]);
			frag.appendChild(c);
		}
		document.body.appendChild(frag);
		setTimeout(() => {
			document.querySelectorAll(".confetti").forEach((el) => el.remove());
		}, 4500);
	}

	/* ============================================================
	   STORY / POEM SEQUENCE
	   ============================================================ */
	function playStory(onDone) {
		$storyBox.classList.add("is-shown");
		let i = 0;

		function showLine() {
			if (i >= MESSAGE_LINES.length) {
				$storyLine.classList.remove("is-visible");
				setTimeout(onDone, 500);
				return;
			}
			$storyLine.classList.remove("is-visible");
			setTimeout(() => {
				$storyLine.textContent = MESSAGE_LINES[i];
				$storyLine.classList.add("is-visible");
				i++;
				setTimeout(showLine, 1550);
			}, 350);
		}
		showLine();
	}

	/* ============================================================
	   STEP SEQUENCE — the whole experience as one ordered list.
	   Add / remove / reorder entries here to change the flow.
	   ============================================================ */
	const STEPS = [
		{
			label: "Turn on the Lights",
			run(next) {
				litLights(true);
				document.body.style.backgroundColor = "var(--peach)";
				setTimeout(next, 2600);
			}
		},
		{
			label: "Play the Music",
			run(next) {
				$bgm.play().catch(() => {});
				setTimeout(next, 1200);
			}
		},
		{
			label: "Let's Decorate",
			run(next) {
				$banner.classList.add("is-shown");
				setTimeout(next, 2200);
			}
		},
		{
			label: "Fly with Balloons",
			run(next) {
				flyBalloons();
				setTimeout(next, 4200);
			}
		},
		{
			label: "Reveal the Cake",
			run(next) {
				$cake.classList.add("is-shown");
				setTimeout(next, 3200);
			}
		},
		{
			label: "Say Happy Birthday",
			run(next) {
				$cake.classList.remove("is-shown");
				spellGreeting();
				$wishHeading.textContent = `Happy Birthday, ${NAME}!`;
				$wishHeading.classList.add("is-shown");
				setTimeout(next, 3000);
			}
		},
		{
			label: "Read the Message",
			run(next) {
				$wishHeading.classList.remove("is-shown");
				playStory(next);
			}
		},
		{
			label: "Celebrate Again",
			run() {
				burstConfetti();
				$storyBox.classList.remove("is-shown");
				$cake.classList.add("is-shown");
				$advanceBtn.textContent = "Restart";
				$progress.textContent = "";
				current = -1;
				$advanceBtn.disabled = false;
			}
		}
	];

	let current = -1;

	function goToStep(index) {
		if (index >= STEPS.length) return;
		current = index;
		const step = STEPS[index];

		$progress.textContent = index < STEPS.length - 1
			? `Step ${index + 1} of ${STEPS.length - 1}`
			: "";

		$advanceBtn.disabled = true;
		$advanceBtn.classList.add("is-swapping");
		setTimeout(() => $advanceBtn.classList.remove("is-swapping"), 350);

		step.run(() => {
			const nextIndex = index + 1;
			if (nextIndex < STEPS.length) {
				$advanceBtn.textContent = STEPS[nextIndex].label;
			}
			$advanceBtn.disabled = false;
		});
	}

	function restart() {
		document.body.style.backgroundColor = "";
		litLights(false);
		$banner.classList.remove("is-shown");
		$cake.classList.remove("is-shown");
		$wishHeading.classList.remove("is-shown");
		$storyBox.classList.remove("is-shown");
		$storyLine.classList.remove("is-visible");
		$balloonField.classList.remove("is-flying", "is-spelling");
		$balloonBorder.classList.remove("is-visible", "is-rising");
		$bgm.pause();
		$bgm.currentTime = 0;
		$advanceBtn.textContent = STEPS[0].label;
		goToStep(0);
	}

	$advanceBtn.addEventListener("click", () => {
		if (current === -1) {
			restart();
			return;
		}
		const isLast = current === STEPS.length - 1;
		if (isLast) return; // final step's run() handles its own state
		goToStep(current + 1);
	});

	/* ============================================================
	   INIT
	   ============================================================ */
	function init() {
		buildAmbient();
		buildLightstring();
		buildBalloons();
		$advanceBtn.textContent = STEPS[0].label;
		$progress.textContent = `Step 1 of ${STEPS.length - 1}`;
	}

	window.addEventListener("load", () => {
		$loader.classList.add("is-hidden");
	});

	document.addEventListener("DOMContentLoaded", init);
})();
