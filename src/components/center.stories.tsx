import React from "react";
import { Map } from "./map";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Center } from "./options";
import { MarkerAnnotation } from "./annotation";

export default {
    title: "Center",
    component: Center,
    argTypes: {
        center: {},
        animated: { type: "boolean" },
    },
} as ComponentMeta<typeof Center>;

const defaultStyle: React.CSSProperties = { width: "640px", height: "480px" };

const authorizationCallback: mapkit.MapKitInitOptions["authorizationCallback"] =
    (done) => {
        fetch("https://jkap-mapkitjs-demo.glitch.me/token")
            .then((res) => res.text())
            .then(done);
    };

const tallahassee = { latitude: 30.4383, longitude: -84.2807 };

const Template: ComponentStory<typeof Center> = ({
    center,
    animated,
    ...rest
}) => (
    <Map style={defaultStyle} authorizationCallback={authorizationCallback}>
        <Center center={center} animated={animated} />
    </Map>
);

export const Base = Template.bind({});
Base.args = {
    center: tallahassee,
    animated: true,
};
