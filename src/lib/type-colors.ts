export const TYPE_COLORS: Record<string, { bg: string; text: string; light: string }> = {
  normal:   { bg: "bg-gray-400",    text: "text-gray-800",   light: "bg-gray-100"   },
  fire:     { bg: "bg-orange-500",  text: "text-orange-900", light: "bg-orange-50"  },
  water:    { bg: "bg-blue-500",    text: "text-blue-900",   light: "bg-blue-50"    },
  electric: { bg: "bg-yellow-400",  text: "text-yellow-900", light: "bg-yellow-50"  },
  grass:    { bg: "bg-green-500",   text: "text-green-900",  light: "bg-green-50"   },
  ice:      { bg: "bg-cyan-400",    text: "text-cyan-900",   light: "bg-cyan-50"    },
  fighting: { bg: "bg-red-700",     text: "text-red-100",    light: "bg-red-50"     },
  poison:   { bg: "bg-purple-500",  text: "text-purple-100", light: "bg-purple-50"  },
  ground:   { bg: "bg-amber-600",   text: "text-amber-100",  light: "bg-amber-50"   },
  flying:   { bg: "bg-indigo-400",  text: "text-indigo-900", light: "bg-indigo-50"  },
  psychic:  { bg: "bg-pink-500",    text: "text-pink-100",   light: "bg-pink-50"    },
  bug:      { bg: "bg-lime-500",    text: "text-lime-900",   light: "bg-lime-50"    },
  rock:     { bg: "bg-stone-500",   text: "text-stone-100",  light: "bg-stone-50"   },
  ghost:    { bg: "bg-violet-700",  text: "text-violet-100", light: "bg-violet-50"  },
  dragon:   { bg: "bg-violet-500",  text: "text-violet-100", light: "bg-violet-50"  },
  dark:     { bg: "bg-gray-700",    text: "text-gray-100",   light: "bg-gray-100"   },
  steel:    { bg: "bg-slate-400",   text: "text-slate-900",  light: "bg-slate-50"   },
  fairy:    { bg: "bg-pink-300",    text: "text-pink-900",   light: "bg-pink-50"    },
};

export function getTypeColor(type: string) {
  return TYPE_COLORS[type] ?? { bg: "bg-gray-400", text: "text-gray-800", light: "bg-gray-100" };
}

export const STAT_COLORS: Record<string, string> = {
  hp:              "bg-red-500",
  attack:          "bg-orange-500",
  defense:         "bg-yellow-500",
  "special-attack":"bg-blue-500",
  "special-defense":"bg-green-500",
  speed:           "bg-pink-500",
};

export function getStatColor(stat: string): string {
  return STAT_COLORS[stat] ?? "bg-gray-400";
}
