import React from "react";
import { Map } from "./map";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Center } from "./options";
import { MarkerAnnotation } from "./annotation";

export default {
    title: "Marker Annotation",
    component: MarkerAnnotation,
    argTypes: {
        coordinate: {},
        onSelect: { action: "selected" },
        onDeselect: { action: "deselected" },
    },
} as ComponentMeta<typeof MarkerAnnotation>;

const defaultStyle: React.CSSProperties = { width: "640px", height: "480px" };

const authorizationCallback: mapkit.MapKitInitOptions["authorizationCallback"] =
    (done) => {
        fetch("https://jkap-mapkitjs-demo.glitch.me/token")
            .then((res) => res.text())
            .then(done);
    };

const tallahassee = { latitude: 30.4383, longitude: -84.2807 };

const Template: ComponentStory<typeof MarkerAnnotation> = ({
    coordinate,
    options,
    ...rest
}) => (
    <Map style={defaultStyle} authorizationCallback={authorizationCallback}>
        <Center center={coordinate} />
        <MarkerAnnotation coordinate={coordinate} options={options} {...rest} />
    </Map>
);

export const Base = Template.bind({});
Base.args = {
    coordinate: tallahassee,
    options: {
        title: "Tallahassee, FL",
    },
};
