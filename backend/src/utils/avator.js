function generateAvatarSeed(name) {
  const cleanName = name.trim().replace(/\s+/g, '-').toLowerCase();
  const randomString = Math.random().toString(36).substring(2, 8);
  return `${cleanName}-${randomString}`;
}


function getAvatarUrl(seed) {
  const baseUrl = 'https://api.dicebear.com/9.x/lorelei-neutral/svg';
  const params = new URLSearchParams({
    seed,
    radius: 50
  });
  return `${baseUrl}?${params.toString()}`;
}

module.exports = {generateAvatarSeed, getAvatarUrl}