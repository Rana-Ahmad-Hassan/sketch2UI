import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProjectStore } from "../../store/projectStore";
import { PALETTES } from "../../constants/Paletts";
import { TYPOGRAPHY } from "../../constants/Typography";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

// Component style configurations
const COMPONENT_STYLES = {
  buttons: {
    title: "Button Styles",
    icon: "🔘",
    description: "Choose how your buttons will look",
    styles: [
      {
        name: "Filled",
        preview: {
          type: "button",
          className: "bg-white text-black px-4 py-2 text-xs rounded",
          content: "Button",
        },
        className: "bg-primary text-primary-foreground hover:bg-primary/90",
        description: "Bold and prominent, great for primary actions",
      },
      {
        name: "Outline",
        preview: {
          type: "button",
          className:
            "border border-white text-white bg-transparent px-4 py-2 text-xs rounded",
          content: "Button",
        },
        className:
          "border border-primary text-primary hover:bg-primary hover:text-primary-foreground",
        description: "Subtle and clean, perfect for secondary actions",
      },
      {
        name: "Ghost",
        preview: {
          type: "button",
          className:
            "text-white bg-white/10 hover:bg-white/20 px-4 py-2 text-xs rounded",
          content: "Button",
        },
        className: "text-primary hover:bg-primary/10",
        description: "Minimal and modern, ideal for tertiary actions",
      },
    ],
  },
  inputs: {
    title: "Input Field Styles",
    icon: "📝",
    description: "Define how your input fields appear",
    styles: [
      {
        name: "Underline",
        preview: {
          type: "input",
          className:
            "border-b border-white bg-transparent px-2 py-1 text-xs text-white w-20",
          placeholder: "Type...",
        },
        className:
          "border-b border-primary bg-transparent focus:border-primary-dark",
        description: "Clean and minimal, saves vertical space",
      },
      {
        name: "Boxed",
        preview: {
          type: "input",
          className:
            "border border-white/30 bg-white/5 px-2 py-1 text-xs text-white rounded w-20",
          placeholder: "Type...",
        },
        className: "border border-input bg-background focus:border-primary",
        description: "Traditional and familiar, clear boundaries",
      },
      {
        name: "Rounded",
        preview: {
          type: "input",
          className:
            "border border-white/30 bg-white/5 px-3 py-1 text-xs text-white rounded-full w-20",
          placeholder: "Type...",
        },
        className:
          "border border-input bg-background rounded-full focus:border-primary",
        description: "Modern and friendly, softer appearance",
      },
    ],
  },
  cards: {
    title: "Card & Section Styles",
    icon: "🃏",
    description: "How your content containers will be styled",
    styles: [
      {
        name: "Flat",
        preview: {
          type: "card",
          className: "bg-white/5 border border-white/10 p-3 w-16 h-12 rounded",
          content: "Card",
        },
        className: "bg-card border-border",
        description: "Simple and clean, minimal visual weight",
      },
      {
        name: "Elevated",
        preview: {
          type: "card",
          className:
            "bg-white/5 shadow-lg shadow-black/20 p-3 w-16 h-12 rounded",
          content: "Card",
        },
        className: "bg-card shadow-lg border-border",
        description: "Raised appearance, adds depth and hierarchy",
      },
      {
        name: "Bordered",
        preview: {
          type: "card",
          className:
            "bg-white/5 border-2 border-white/20 p-3 w-16 h-12 rounded",
          content: "Card",
        },
        className: "bg-card border-2 border-primary/20",
        description: "Strong definition, clear content separation",
      },
      {
        name: "Glass",
        preview: {
          type: "card",
          className:
            "bg-white/10 backdrop-blur border border-white/20 p-3 w-16 h-12 rounded",
          content: "Card",
        },
        className: "bg-background/50 backdrop-blur-sm border-border/50",
        description: "Modern frosted effect, elegant and contemporary",
      },
    ],
  },
  avatars: {
    title: "Avatar & Media Styles",
    icon: "👤",
    description: "Shape style for profile pictures and media",
    styles: [
      {
        name: "Square",
        preview: {
          type: "avatar",
          className:
            "w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-none",
        },
        className: "rounded-none",
        description: "Sharp and geometric, modern corporate feel",
      },
      {
        name: "Rounded",
        preview: {
          type: "avatar",
          className:
            "w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg",
        },
        className: "rounded-lg",
        description: "Balanced and friendly, versatile for any context",
      },
      {
        name: "Circular",
        preview: {
          type: "avatar",
          className:
            "w-8 h-8 bg-gradient-to-br from-pink-400 to-red-500 rounded-full",
        },
        className: "rounded-full",
        description: "Classic and personal, perfect for profile pictures",
      },
    ],
  },
};

export default function DesignPanel() {
  const [selectedPalette, setSelectedPalette] = useState(PALETTES[0]);
  const [selectedFont, setSelectedFont] = useState(TYPOGRAPHY[0]);
  const [selectedStyles, setSelectedStyles] = useState<any>({
    buttons: COMPONENT_STYLES.buttons.styles[0],
    inputs: COMPONENT_STYLES.inputs.styles[0],
    cards: COMPONENT_STYLES.cards.styles[0],
    avatars: COMPONENT_STYLES.avatars.styles[0],
  });

  const { colorPallete, typography, setColorPalette, setTypography } =
    useProjectStore();

  const ComponentStyleSection = ({ categoryKey, category }: any) => (
    <motion.section variants={itemVariants} className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">{category.icon}</span>
        <div>
          <motion.h2
            className="text-lg font-light text-white tracking-wide"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            {category.title}
          </motion.h2>
          <p className="text-xs text-zinc-500 font-light">
            {category.description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <AnimatePresence>
          {category.styles.map((style: any, index: any) => (
            <motion.div
              key={style.name}
              whileHover="hover"
              whileTap="tap"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className={`relative cursor-pointer rounded-lg border transition-all duration-300 ${
                selectedStyles[categoryKey].name === style.name
                  ? "border-white/20 bg-white/[0.02] shadow-lg shadow-white/5"
                  : "border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02]"
              }`}
              onClick={() =>
                setSelectedStyles((prev: any) => ({ ...prev, [categoryKey]: style }))
              }
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <motion.h3
                      className="text-sm font-medium text-white mb-1"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08 + 0.2, duration: 0.3 }}
                    >
                      {style.name}
                    </motion.h3>
                    <motion.p
                      className="text-xs text-zinc-400 font-light leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.08 + 0.3, duration: 0.3 }}
                    >
                      {style.description}
                    </motion.p>
                  </div>

                  <motion.div
                    className="ml-6 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.08 + 0.4, duration: 0.3 }}
                  >
                    {style.preview.type === "button" && (
                      <div
                        className={`${style.preview.className} transition-all duration-200`}
                      >
                        {style.preview.content}
                      </div>
                    )}
                    {style.preview.type === "input" && (
                      <input
                        className={`${style.preview.className} outline-none`}
                        placeholder={style.preview.placeholder}
                        readOnly
                      />
                    )}
                    {style.preview.type === "card" && (
                      <div
                        className={`${style.preview.className} text-xs text-white/70 flex items-center justify-center`}
                      >
                        {style.preview.content}
                      </div>
                    )}
                    {style.preview.type === "avatar" && (
                      <div
                        className={`${style.preview.className} flex items-center justify-center`}
                      >
                        <span className="text-white text-xs font-medium">
                          A
                        </span>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
              <AnimatePresence>
                {selectedStyles[categoryKey].name === style.name && (
                  <motion.div
                    className="absolute top-3 right-3"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{
                      duration: 0.3,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.section>
  );

  return (
    <div className="min-h-screen bg-black p-6">
      <motion.div
        className="max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="mb-12" variants={itemVariants}>
          <motion.h1
            className="text-2xl font-light text-white tracking-tight mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Design Panel
          </motion.h1>
          <motion.p
            className="text-zinc-500 text-sm font-light"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Configure your application's visual identity and component styles
          </motion.p>
        </motion.div>

        <div className="space-y-16">
          {/* Color Palettes */}
          <motion.section variants={itemVariants}>
            <motion.h2
              className="text-lg font-light text-white mb-8 tracking-wide"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              Color Palette
            </motion.h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              <AnimatePresence>
                {PALETTES.map((palette, index) => (
                  <motion.div
                    key={palette.name}
                    whileHover="hover"
                    whileTap="tap"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className={`relative cursor-pointer  rounded-lg border transition-all duration-300 ${
                      selectedPalette.name === palette.name
                        ? "border-white/20 bg-white/[0.02] shadow-lg shadow-white/5"
                        : "border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02]"
                    }`}
                    onClick={() => setColorPalette(palette)}
                  >
                    <div className="p-4">
                      <motion.div
                        className="flex gap-1.5 mb-3"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
                      >
                        {palette.colors.map((color, colorIndex) => (
                          <motion.div
                            key={colorIndex}
                            className="h-6 w-6 rounded-md border border-white/10"
                            style={{ backgroundColor: color }}
                            whileHover={{ scale: 1.1, rotateZ: 5 }}
                            transition={{ duration: 0.2 }}
                          />
                        ))}
                      </motion.div>
                      <motion.p
                        className="text-xs font-light text-zinc-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.3 }}
                      >
                        {palette.name}
                      </motion.p>
                    </div>
                    <AnimatePresence>
                      {selectedPalette.name === palette.name && (
                        <motion.div
                          className="absolute top-3 right-3"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 180 }}
                          transition={{
                            duration: 0.3,
                            type: "spring",
                            stiffness: 200,
                          }}
                        >
                          <div className="h-2 w-2 rounded-full bg-white"></div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.section>

          {/* Typography */}
          <motion.section variants={itemVariants}>
            <motion.h2
              className="text-lg font-light text-white mb-8 tracking-wide"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              Typography
            </motion.h2>
            <div className="space-y-3 h-[400px] overflow-y-scroll">
              <AnimatePresence>
                {TYPOGRAPHY.map((font, index) => (
                  <motion.div
                    key={font.name}
                    whileHover="hover"
                    whileTap="tap"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                    className={`relative cursor-pointer rounded-lg border transition-all duration-300 ${
                      selectedFont.name === font.name
                        ? "border-white/20 bg-white/[0.02] shadow-lg shadow-white/5"
                        : "border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02]"
                    }`}
                    onClick={() => setTypography(font)}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <motion.h3
                            className="text-lg font-light text-white mb-2"
                            style={{ fontFamily: font.name }}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: index * 0.08 + 0.2,
                              duration: 0.3,
                            }}
                          >
                            {font.heading}
                          </motion.h3>
                          <motion.p
                            className="text-sm text-zinc-500 font-light"
                            style={{ fontFamily: font.name }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                              delay: index * 0.08 + 0.3,
                              duration: 0.3,
                            }}
                          >
                            {font.body}
                          </motion.p>
                        </div>
                        <div className="text-right ml-6">
                          <motion.span
                            className="text-xs text-zinc-600 font-mono tracking-wider"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                              delay: index * 0.08 + 0.4,
                              duration: 0.3,
                            }}
                          >
                            {font.name}
                          </motion.span>
                        </div>
                      </div>
                    </div>
                    <AnimatePresence>
                      {selectedFont.name === font.name && (
                        <motion.div
                          className="absolute top-4 right-4"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 180 }}
                          transition={{
                            duration: 0.3,
                            type: "spring",
                            stiffness: 200,
                          }}
                        >
                          <div className="h-2 w-2 rounded-full bg-white"></div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.section>

          {/* Component Styles */}
          <motion.div variants={itemVariants}>
            <motion.h2
              className="text-xl font-light text-white mb-2 tracking-wide"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Component Styles
            </motion.h2>
            <motion.p
              className="text-zinc-500 text-sm font-light mb-12"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Customize how your UI components will look and feel
            </motion.p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {Object.entries(COMPONENT_STYLES).map(([key, category]) => (
                <ComponentStyleSection
                  key={key}
                  categoryKey={key}
                  category={category}
                />
              ))}
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            className="flex gap-4 pt-8"
            variants={itemVariants}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <motion.button
              className="flex-1 bg-white text-black text-sm font-light px-6 py-3 rounded-lg transition-all duration-300 hover:bg-zinc-100 hover:shadow-lg"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 10px 25px rgba(255,255,255,0.1)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              Apply Configuration
            </motion.button>
            <motion.button
              onClick={() => {
                setSelectedPalette(PALETTES[0]);
                setSelectedFont(TYPOGRAPHY[0]);
                setSelectedButtonStyle(BUTTON_STYLES[0]);
                setSelectedInputStyle(INPUT_STYLES[0]);
                setSelectedCardStyle(CARD_STYLES[0]);
                setSelectedAvatarStyle(AVATAR_STYLES[0]);
              }}
              className="px-6 py-3 text-sm font-light text-zinc-400 border border-white/10 rounded-lg transition-all duration-300 hover:border-white/20 hover:text-zinc-300 hover:bg-white/[0.02]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              Reset
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
