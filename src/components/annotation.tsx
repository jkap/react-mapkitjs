import React, { useContext, useEffect, useRef } from "react";
import { parseCoordinate } from "../types";
import { MapContext } from "./map";

export const MarkerAnnotation: React.FC<{
    coordinate: mapkit.Coordinate | { latitude: number; longitude: number };
    options?: mapkit.MarkerAnnotationConstructorOptions;
    onSelect?: Parameters<mapkit.MarkerAnnotation["addEventListener"]>[1];
    onDeselect?: Parameters<mapkit.MarkerAnnotation["addEventListener"]>[1];
}> = ({ coordinate, options, onSelect, onDeselect }) => {
    const { map } = useContext(MapContext);

    useEffect(() => {
        if (!map) return;
        const parsedCoordinate = parseCoordinate(coordinate);

        const annotation = new mapkit.MarkerAnnotation(
            parsedCoordinate,
            options
        );

        if (onSelect) annotation.addEventListener("select", onSelect);
        if (onDeselect) annotation.addEventListener("deselect", onDeselect);

        map.addAnnotation(annotation);

        return () => {
            if (onSelect) annotation.removeEventListener("select", onSelect);
            if (onDeselect)
                annotation.removeEventListener("deselect", onDeselect);
            map.removeAnnotation(annotation);
        };
    }, [map, coordinate, options, onSelect]);

    return null;
};
