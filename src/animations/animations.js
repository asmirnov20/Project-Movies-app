export const fadeInUp = {
    initial: {
        y: 200,
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: [0.6, -0.05, 0.01, 0.99]
        }
    }
}

export const stagger = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
}

export const scaleAnimate = {
    initial: {
        scale: 0
    },
    animate: {
        scale: 1,
        transition: {
            duration: 0.8,
            ease: 'easeOut'
        }
    }
}

export const fadeInDown = {
    initial: {
        y: -200,
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: [0.6, -0.05, 0.01, 0.99]
        }
    },
    exit: {
        y: '100vh',
        opacity: 0,
        transition: {
            duration: 0.1
        }
    }
}

export const pageTransition = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
    },
    exit: {
        opacity: 0
    }
}

export const fadeInRight = {
    initial: {
        x: -200,
        opacity: 0
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 1.5,
            ease: [0.6, -0.05, 0.01, 0.99]
        }
    },
}

export const detailsFadeInUp = {
    initial: {
        y: 300,
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 1,
            ease: [0.6, -0.05, 0.01, 0.99]
        }
    }
}

export const catalogFadeInUp = {
    initial: {
        y: 100,
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: [0.6, -0.05, 0.01, 0.99]
        }
    }
}