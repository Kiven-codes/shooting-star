document.addEventListener("DOMContentLoaded", () => {
  const starsContainer = document.getElementById("stars")
  const shootingStarsContainer = document.getElementById("shooting-stars")
  const personGif = document.getElementById("person-gif")
  const personContainer = document.querySelector(".person-container")
  const messageBubble = document.querySelector(".message-bubble")
  const authorIcon = document.querySelector(".author-icon")
  const authorInfo = document.querySelector(".author-info")

  // Array of quotes about stars and the universe
  const quotes = [
    { text: "Look up at the stars and not down at your feet.", author: "Stephen Hawking" },
    { text: "We are all in the gutter, but some of us are looking at the stars.", author: "Oscar Wilde" },
    { text: "The cosmos is within us. We are made of star-stuff.", author: "Carl Sagan" },
    {
      text: "Not just beautiful, though—the stars are like the trees in the forest, alive and breathing.",
      author: "Tao Lin",
    },
    { text: "I have loved the stars too fondly to be fearful of the night.", author: "Sarah Williams" },
    {
      text: "The stars are the jewels of the night, and perchance surpass anything which day has to show.",
      author: "Henry David Thoreau",
    },
    { text: "Keep your eyes on the stars, and your feet on the ground.", author: "Theodore Roosevelt" },
    {
      text: "The nitrogen in our DNA, the calcium in our teeth, the iron in our blood, the carbon in our apple pies were made in the interiors of collapsing stars.",
      author: "Carl Sagan",
    },
    {
      text: "For my part I know nothing with any certainty, but the sight of the stars makes me dream.",
      author: "Vincent Van Gogh",
    },
    {
      text: "We are bits of stellar matter that got cold by accident, bits of a star gone wrong.",
      author: "Arthur Eddington",
    },
    { text: "The stars are the street lights of eternity.", author: "Unknown" },
    { text: "When it is dark enough, you can see the stars.", author: "Ralph Waldo Emerson" },
  ]

  // Handle missing GIF
  personGif.onerror = function () {
    this.onerror = null
    console.log("GIF failed to load, using fallback silhouette")
    // The CSS fallback will handle the styling
  }

  // Add click event to person
  personContainer.addEventListener("click", () => {
    // Show random quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    const messageParagraph = messageBubble.querySelector("p")
    messageParagraph.innerHTML = `"${randomQuote.text}"<br><span class="quote-author">— ${randomQuote.author}</span>`

    // Add active class to show the message
    messageBubble.classList.add("active")

    // Hide message after 7 seconds (longer for quotes)
    setTimeout(() => {
      messageBubble.classList.remove("active")
    }, 7000)

    // Removed the lines that create extra shooting stars
    // createShootingStar()
    // createShootingStar()
  })

  // Add click event to author icon
  authorIcon.addEventListener("click", () => {
    // Toggle author info visibility
    authorInfo.classList.toggle("active")

    // Hide author info after 5 seconds if it's visible
    if (authorInfo.classList.contains("active")) {
      setTimeout(() => {
        authorInfo.classList.remove("active")
      }, 5000)
    }
  })

  // Create background stars
  function createStars() {
    for (let i = 0; i < 200; i++) {
      const star = document.createElement("div")
      star.className = "star"

      // Random position
      const x = Math.random() * window.innerWidth
      const y = Math.random() * (window.innerHeight - 200) // Keep stars above the trees

      // Random size
      const size = Math.random() * 2

      star.style.left = `${x}px`
      star.style.top = `${y}px`
      star.style.width = `${size}px`
      star.style.height = `${size}px`

      // Random animation delay
      star.style.animationDelay = `${Math.random() * 3}s`

      starsContainer.appendChild(star)
    }
  }

  // Create shooting stars
  function createShootingStar() {
    const shootingStar = document.createElement("div")
    shootingStar.className = "shooting-star"

    // Random starting position (anywhere along the top or left edge)
    const startFromTop = Math.random() > 0.5
    let startX, startY

    if (startFromTop) {
      startX = Math.random() * window.innerWidth
      startY = -10
    } else {
      startX = -10
      startY = Math.random() * (window.innerHeight * 0.6) // Upper 60% of screen
    }

    // Random angle between -15 and -75 degrees
    const angle = -15 - Math.random() * 60

    shootingStar.style.left = `${startX}px`
    shootingStar.style.top = `${startY}px`
    shootingStar.style.transform = `rotate(${angle}deg)`

    // Random trail length
    const trailLength = 50 + Math.random() * 100
    shootingStar.style.setProperty("--trail-length", `${trailLength}px`)

    // Random brightness
    const brightness = 0.7 + Math.random() * 0.3
    shootingStar.style.setProperty("--star-brightness", brightness)

    shootingStarsContainer.appendChild(shootingStar)

    // Animate the shooting star
    const distance = 500 + Math.random() * 1000
    const duration = 1 + Math.random() * 2
    const angleInRadians = angle * (Math.PI / 180)

    // Calculate end position based on angle
    const endX = startX + Math.cos(angleInRadians) * distance
    const endY = startY - Math.sin(angleInRadians) * distance

    // Add slight curve to some shooting stars
    const useCurve = Math.random() > 0.7
    let keyframes

    if (useCurve) {
      // Add a control point for bezier curve
      const controlX = (startX + endX) / 2 + (Math.random() * 100 - 50)
      const controlY = (startY + endY) / 2 + (Math.random() * 100 - 50)

      keyframes = [
        {
          transform: `translate(0, 0) rotate(${angle}deg)`,
          opacity: 0,
          offset: 0,
        },
        {
          transform: `translate(${controlX - startX}px, ${controlY - startY}px) rotate(${angle}deg)`,
          opacity: brightness,
          offset: 0.5,
        },
        {
          transform: `translate(${endX - startX}px, ${endY - startY}px) rotate(${angle}deg)`,
          opacity: 0,
          offset: 1,
        },
      ]
    } else {
      keyframes = [
        {
          transform: `translate(0, 0) rotate(${angle}deg)`,
          opacity: 0,
        },
        {
          transform: `translate(${distance * 0.1}px, ${-distance * 0.1}px) rotate(${angle}deg)`,
          opacity: brightness,
          offset: 0.1,
        },
        {
          transform: `translate(${endX - startX}px, ${endY - startY}px) rotate(${angle}deg)`,
          opacity: 0,
        },
      ]
    }

    shootingStar.animate(keyframes, {
      duration: duration * 1000,
      easing: "ease-out",
      fill: "forwards",
    }).onfinish = () => {
      shootingStar.remove()
    }
  }

  // Create trees dynamically (additional trees for variety)
  function createAdditionalTrees() {
    const treesContainer = document.querySelector(".trees-container")

    for (let i = 0; i < 10; i++) {
      const tree = document.createElement("div")
      tree.className = "tree"

      const height = 50 + Math.random() * 70
      const width = 20 + Math.random() * 30
      const left = Math.random() * 100

      tree.style.position = "absolute"
      tree.style.bottom = "0"
      tree.style.left = `${left}%`
      tree.style.width = `${width}px`
      tree.style.height = `${height}px`
      tree.style.backgroundColor = "black"
      tree.style.clipPath = "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)"
      tree.style.zIndex = Math.floor(left)

      treesContainer.appendChild(tree)
    }
  }

  // Initialize stars and trees
  createStars()
  createAdditionalTrees()

  // Create shooting stars periodically
  setInterval(createShootingStar, 1000)

  // Create initial shooting stars
  for (let i = 0; i < 5; i++) {
    setTimeout(createShootingStar, Math.random() * 1000)
  }

  // Resize handler
  window.addEventListener("resize", () => {
    starsContainer.innerHTML = ""
    createStars()
  })
})

