/* Shared Enso Labs logo lockups for the Strategy -> Ship figure generators.
 * Reads the committed brand SVGs so every visual carries the mark. */
const fs = require('fs');
const path = require('path');

const read = (file) =>
  fs.readFileSync(path.join(__dirname, '..', 'public', 'images', file), 'utf8')
    .replace(/<\?xml[\s\S]*?\?>/, '')
    .replace(/<sodipodi:namedview[\s\S]*?<\/sodipodi:namedview>/, '')
    .replace(/<namedview[\s\S]*?<\/namedview>/, '');

const wrap = (svg, h) => {
  // Force an explicit pixel height on the root <svg> (it ships with only a viewBox).
  const sized = svg.replace(/<svg\b/, `<svg height="${h}" preserveAspectRatio="xMinYMid meet" `);
  return `<span class="enso-logo" style="display:inline-flex;align-items:center;line-height:0">${sized}</span>`;
};

module.exports = {
  logoInk: (h = 44) => wrap(read('logo-ink.svg'), h),
  logoWhite: (h = 44) => wrap(read('logo-white.svg'), h),
};
