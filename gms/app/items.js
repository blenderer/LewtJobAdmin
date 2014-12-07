define([
    'knockout',
    'komapping',
    'underscore',
    'lewtgms.common',
    'lewtgms.item.structure',
    'lewtgms.contentcollection'
    ], function (ko, komapping, _, common, structure, Collection) {

    var self = {};

    self.init = function(data) {
        var i = 0;
        var idCallback = function(){return i++;};

        var self = new Collection("items", structure, data.items, [idCallback]);
        self.vm = {};

        self.ref = data;

        self.findNewId = function() {
            var idsArray = _.map(self.getCollection(), function(item) {
                return item.id;
            });

            if (idsArray.length == 0) {
                return 0;
            }

            return common.getHighestNumber(idsArray) + 1;
        }
        
        self.vm.addNew = function() {
            var newItem = self.newItemForApp([self.findNewId]);

            var newId = newItem.id();

            self.collection.push(newItem);

            self.vm.selectedItem(newId);
            self.vm.changeSelectedItem();
        }

        self.vm.selectedItem = ko.observable(0);

        self.vm.changeSelectedItem = function() {
            _.each(self.collection(), function(item) {
                item.selected(false);
            })

            var toSelect = _.find(self.collection(), function(item) {
                return item.id() == self.vm.selectedItem()
            });
            if (toSelect) {
                toSelect.selected(true);
            }
        };

        self.vm.removeSelectedItem = function() {

        };

        self.collection()[0].selected(true);

        return self;
    }

    


    return self;
});