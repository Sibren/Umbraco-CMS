(function () {
    "use strict";

    function MemberAppContentController($scope, $filter, contentEditingHelper, contentTypeHelper) {

        var vm = this;

        vm.tabs = [];
        vm.activeTabAlias = null;

        vm.setActiveTab = setActiveTab;
        vm.hideSystemProperties = hideSystemProperties;

        $scope.$watchCollection('content.tabs', (newValue) => {

            contentTypeHelper.defineParentAliasOnGroups(newValue);
            contentTypeHelper.relocateDisorientedGroups(newValue);

            vm.tabs = $filter("filter")(newValue, (tab) => {
                return tab.type === contentTypeHelper.TYPE_TAB;
            });

            if (vm.tabs.length > 0) {
                // if we have tabs and some groups that doesn't belong to a tab we need to render those on an "Other" tab.
                contentEditingHelper.registerGenericTab(newValue);

                setActiveTab(vm.tabs[0]);
            }
        });

        function setActiveTab (tab) {
            vm.activeTabAlias = tab.alias;
            vm.tabs.forEach(tab => tab.active = false);
            tab.active = true;
        }

        function hideSystemProperties (property) {
            // hide some specific, known properties by alias
            if (property.alias === "_umb_id" || property.alias === "_umb_doctype") {
                return false;
            }
            // hide all label properties with the alias prefix "umbracoMember" (e.g. "umbracoMemberFailedPasswordAttempts")
            return property.view !== "readonlyvalue" || property.alias.startsWith('umbracoMember') === false;
        }
    }

    angular.module("umbraco").controller("Umbraco.Editors.Member.Apps.ContentController", MemberAppContentController);
})();
