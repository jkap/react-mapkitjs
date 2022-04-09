import React, {
    useCallback,
    useEffect,
    useRef,
    useState,
    createContext,
} from "react";

export const MapContext = createContext<{
    map: mapkit.Map | null;
}>({ map: null });

export const Map: React.FC<{
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    authorizationCallback: mapkit.MapKitInitOptions["authorizationCallback"];
    mapkitOptions?: mapkit.MapConstructorOptions;
}> = ({ className, style, authorizationCallback, mapkitOptions, children }) => {
    const [loaded, setLoaded] = useState(false);
    const mapEl = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<mapkit.Map | null>(null);

    const loadMap = useCallback(() => {
        // if the map el doesn't exist, wait a tick and try again
        if (!mapEl.current) {
            setTimeout(() => loadMap(), 0);
            return;
        }

        setLoaded(true);

        mapkit.init({
            authorizationCallback,
        });

        setMap(new mapkit.Map(mapEl.current, mapkitOptions));
    }, []);

    useEffect(() => {
        if (!map) return;

        Object.assign(map, mapkitOptions);
    }, [map, mapkitOptions]);

    useEffect(() => {
        const scriptTag = document.createElement("script");

        scriptTag.src = "https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js";
        scriptTag.async = true;

        scriptTag.onload = () => loadMap();

        document.body.appendChild(scriptTag);

        return () => {
            setLoaded(false);
            document.body.removeChild(scriptTag);
        };
    }, []);

    return (
        <MapContext.Provider value={{ map }}>
            <div ref={mapEl} className={className} style={style}>
                {children}
            </div>
        </MapContext.Provider>
    );
};

Map.defaultProps = {
    className: "",
    style: {},
};
