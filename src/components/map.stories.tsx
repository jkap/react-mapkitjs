import React from "react";
import { Map } from "./map";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Center } from "./options";
import { MarkerAnnotation } from "./annotation";

export default {
    title: "Map",
    component: Map,
    argTypes: {
        mapkitOptions: {
            control: "object",
        },
    },
} as ComponentMeta<typeof Map>;

const defaultStyle: React.CSSProperties = { width: "640px", height: "480px" };

const authorizationCallback: mapkit.MapKitInitOptions["authorizationCallback"] =
    (done) => {
        fetch("https://jkap-mapkitjs-demo.glitch.me/token")
            .then((res) => res.text())
            .then(done);
    };

const tallahassee = { latitude: 30.4383, longitude: -84.2807 };

export const Base: ComponentStory<typeof Map> = () => (
    <Map style={defaultStyle} authorizationCallback={authorizationCallback}>
        <Center center={tallahassee} />
        <MarkerAnnotation
            coordinate={tallahassee}
            options={{
                title: "Tallahassee, FL",
            }}
        />
    </Map>
);
