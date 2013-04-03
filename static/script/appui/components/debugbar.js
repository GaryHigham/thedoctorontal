require.def("drontal/appui/components/debugbar",
    [
        "antie/widgets/component",
        "antie/widgets/label"
    ],
    function (Component, Label) {

        // All components extend Component
        return Component.extend({
            init: function () {
                var tvBrand, tvModel, resolution;

                // It is important to call the constructor of the superclass
                this._super("debugbar");

                // Add the labels to the component
                tvBrand = new Label("tvBrand", "brand: " + debug.brand + "</br>");
                tvModel = new Label("tvModel", "model: " + debug.model + "</br>");

                var screenSize = this.getCurrentApplication().getDevice().getScreenSize();

                resolution = new Label(
                    "resolution",
                    "resolution: " + screenSize.width + " x " + screenSize.height
                );

                this.appendChildWidget(tvBrand);
                this.appendChildWidget(tvModel);
                this.appendChildWidget(resolution);
            }

        });
    }
);