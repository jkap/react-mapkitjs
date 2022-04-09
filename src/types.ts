export type Coordinate =
    | mapkit.Coordinate
    | { latitude: number; longitude: number };

export function parseCoordinate(coordinate: Coordinate): mapkit.Coordinate {
    if (coordinate instanceof mapkit.Coordinate) {
        return coordinate;
    }

    const coord = new mapkit.Coordinate(
        coordinate.latitude,
        coordinate.longitude
    );

    return coord;
}
