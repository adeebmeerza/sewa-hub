import PlaceSearchBox from "./PlaceSearchBox";
import GoogleMap from "./GoogleMap";
import { IPin } from "../search-box/location-picker";

const MapContainer = ({ pin, setPin }: IPin) => {
  return (
    <div className="flex flex-col w-full h-[50vh] gap-2">
      <PlaceSearchBox pin={pin} setPin={setPin} />
      <GoogleMap pin={pin} setPin={setPin} />
    </div>
  );
};

export default MapContainer;
