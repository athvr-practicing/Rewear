function genrateImgname(name){
    let cleanName = user.name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')         
    .substring(0, 20);           
  
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 6);

    imgName = cleanName+"-"+timestamp+"-"+random
    return imgName;
}

module.exports = genrateImgname;