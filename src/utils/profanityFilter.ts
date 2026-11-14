// Profanity filter with ### and *** censorship for Indonesian & English bad words
// Shared between frontend UI and server.ts WebSocket chat server

const BAD_WORDS_EXACT_OR_VARIANT: string[] = [
  // Indonesian profanity & slurs
  'anjing', 'anjir', 'anjay', 'njir', 'njing', 'ajg', 'anying',
  'bangsat', 'bgst', 'bego', 'begok', 'tolol', 'goblok', 'gblk', 'goblog',
  'bodoh', 'idiot', 'kontol', 'kntl', 'memek', 'mmk', 'pepek', 'jembut',
  'jmbt', 'ngentot', 'entot', 'ngtd', 'ngewe', 'ewe', 'perek', 'lonte',
  'pelacur', 'jablay', 'babi', 'monyet', 'kunyuk', 'kampret', 'kmprt',
  'keparat', 'brengsek', 'bajingan', 'bjngn', 'setan', 'iblis', 'jancok',
  'jancuk', 'dancok', 'cuk', 'cok', 'asu', 'asw', 'taik', 'tai', 'taek',
  'berak', 'kencing', 'pantek', 'pante', 'pukimak', 'kimak', 'puki',
  'sundala', 'telaso', 'silit', 'bool', 'bokong', 'tetek', 'toket',
  'sange', 'colmek', 'coli', 'bokep', 'porno', 'hentai', 'bacot', 'bcot',
  'bacod', 'congor', 'cocot', 'nyocot', 'mampus', 'modar', 'mati aja',
  'kepala bapak', 'yatim', 'haramjadah', 'anak haram', 'peju', 'mani',
  'itil', 'clit', 'pelir', 'peler', 'biji', 'pler', 'titit', 'tytyd',
  // English profanity & slurs
  'fuck', 'fucker', 'fucking', 'fucked', 'motherfucker', 'mf', 'mfer',
  'shit', 'shitty', 'bullshit', 'bitch', 'bitches', 'asshole', 'dumbass',
  'jackass', 'bastard', 'cunt', 'dick', 'dickhead', 'cock', 'pussy',
  'whore', 'slut', 'skank', 'retard', 'retarded', 'faggot', 'fag',
  'nigger', 'nigga', 'stfu', 'gtfo', 'kys', 'wtf', 'porn', 'nsfw',
  'penis', 'vagina', 'boobs', 'tits', 'horny', 'cum', 'jizz', 'wank',
  'wanker', 'twat', 'prick', 'douche', 'douchebag', 'scumbag', 'moron',
];

const LEET_MAP: Record<string, string> = {
  a: '[a4@]',
  b: '[b8]',
  c: '[ck]',
  e: '[e3]',
  g: '[g96]',
  i: '[i1!l]',
  l: '[l1!i]',
  o: '[o0]',
  s: '[s5$z]',
  t: '[t7]',
  u: '[uv]',
  z: '[z2s]',
};

function wordToFlexiblePattern(word: string): string {
  const chars = word.split('');
  return chars
    .map((ch) => {
      if (ch === ' ') return '[\\s._\\-*]*';
      const base = LEET_MAP[ch] || ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // Allow repeated characters like "anjiiiing" and subtle separators like "a.n.j.i.n.g"
      return `${base}+[\\s._\\-*]*`;
    })
    .join('')
    .replace(/\[\\s\._\\-\*\]\*$/, ''); // trim trailing separator
}

// Build regexes safely once
const PROFANITY_REGEXES: RegExp[] = BAD_WORDS_EXACT_OR_VARIANT.map((word) => {
  const pattern = wordToFlexiblePattern(word);
  return new RegExp(`(?<![a-zA-Z0-9])${pattern}(?![a-zA-Z0-9])`, 'gi');
});

/**
 * Generates alternating ### and *** mask matching the requested censorship style.
 * Example: 4 chars -> "###*", 6 chars -> "###***", short word -> "###***"
 */
function generateCensorMask(matchedLength: number, wordIndex: number): string {
  if (matchedLength <= 3) {
    return wordIndex % 2 === 0 ? '###' : '***';
  }
  if (matchedLength <= 6) {
    return wordIndex % 2 === 0 ? '###***' : '***###';
  }
  // Longer words repeat ###*** pattern
  let mask = '';
  let chunkIdx = wordIndex;
  while (mask.length < matchedLength) {
    mask += chunkIdx % 2 === 0 ? '###' : '***';
    chunkIdx++;
  }
  return mask.slice(0, Math.max(6, matchedLength));
}

export interface ProfanityResult {
  sanitized: string;
  hasProfanity: boolean;
  matchesCount: number;
}

/**
 * Censors harsh/profane words using ### and *** markers.
 */
export function censorProfanity(input: string): ProfanityResult {
  if (!input || typeof input !== 'string') {
    return { sanitized: '', hasProfanity: false, matchesCount: 0 };
  }

  let output = input;
  let matchesCount = 0;

  for (const regex of PROFANITY_REGEXES) {
    output = output.replace(regex, (match) => {
      const mask = generateCensorMask(match.length, matchesCount);
      matchesCount++;
      return mask;
    });
  }

  return {
    sanitized: output,
    hasProfanity: matchesCount > 0,
    matchesCount,
  };
}
