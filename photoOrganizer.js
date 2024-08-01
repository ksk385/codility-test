const photoCsvLines = `photo.jpg, Warsaw, 2013-09-05 14:08:15
Jay.png, London, 2015-06-20 15:13:22
myFriends.png, Warsaw, 2013-09-05 14:07:13
Eiffel.jpg, Paris, 2015-07-23 08:03:02
pisatower.jpg, Paris, 2015-07-22 23:59:59
BOB.jpg, London, 2015-08-05 00:02:03
notredame.png, Paris, 2015-09-01 12:00:00
me.jpg, Warsaw, 2013-09-06 15:40:22
a.png, Warsaw, 2016-02-13 13:33:50
b.jpg, Warsaw, 2016-01-02 15:12:22
c.jpg, Warsaw, 2016-01-02 14:34:30
d.jpg, Warsaw, 2016-01-02 15:15:01
e.png, Warsaw, 2016-01-02 09:49:09
f.png, Warsaw, 2016-01-02 10:55:32
g.jpg, Warsaw, 2016-02-29 22:13:11`;

function solution(S) {
  const citiesMap = new Map();
  const photoEntries = S.split("\n");

  let origIndex = 0;
  for (photoEntry of photoEntries) {
    const photoDetailsArray = photoEntry.split(",");
    cityName = photoDetailsArray[1].trim();
    if (!citiesMap.has(cityName)) {
      citiesMap.set(cityName, new Array());
    }
    // COnvert the date to a date object
    citiesMap.get(cityName).push({
      name: photoDetailsArray[0].trim(),
      timestamp: new Date(photoDetailsArray[2]),
      origIndex: origIndex,
    });
    origIndex++;
  }

  //console.log(citiesMap);
  for (city of citiesMap.keys()) {
    //console.log(city);
    const photos = citiesMap.get(city);
    photos.sort((a, b) => a.timestamp - b.timestamp);
    //console.log("Sorted Photos", photos);
    const cityPhotoCount = photos.length;
    //console.log(`${city} has ${cityPhotoCount} photos`)
    const padding = cityPhotoCount.toString().length;

    for (let i = 0; i < photos.length; i++) {
      const photo = photos[i];
      let newName = `${city}${(i + 1).toString().padStart(padding, "0")}.${
        photo.name.split(".")[1]
      }`;
      //console.log(newName);
      photo["newName"] = newName;
    }
  }

  //collect all photoes in a single array
  const allPhotos = [];
  for (city of citiesMap.keys()) {
    allPhotos.push(...citiesMap.get(city));
  }
  //sort all photoes based on orgiIndex
  allPhotos.sort((a, b) => a.origIndex - b.origIndex);
  // return string of all photos new names

  return allPhotos.map((photo) => photo.newName).join("\n");
}

console.log(solution(photoCsvLines));
