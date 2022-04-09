import React, { useContext, useEffect } from "react";
import { parseCoordinate } from "../types";
import { MapContext } from "./map";

export const Center: React.FC<{
    center: mapkit.Coordinate | { latitude: number; longitude: number };
    animated?: boolean;
}> = ({ center, animated = true }) => {
    const { map } = useContext(MapContext);

    useEffect(() => {
        if (!map) return;

        const coord = parseCoordinate(center);
        map.setCenterAnimated(coord, animated);
    }, [map, center]);

    return null;
};
