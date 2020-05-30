import distance from "./distance";
export default function calculateDistance(stores, userLocation) {
  if (userLocation) {
    const updatedStores = stores.map(store => ({
      ...store,
      distance: distance(
        userLocation.latitude,
        userLocation.longitude,
        store.latitude,
        store.longitude
      )
    }));
    console.log(updatedStores);
    // return updatedStores;
  }
}
