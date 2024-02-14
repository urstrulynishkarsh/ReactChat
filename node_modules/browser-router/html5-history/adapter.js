/**
 * History.js Native Adapter
 * @author Benjamin Arthur Lupton <contact@balupton.com>
 * @copyright 2010-2011 Benjamin Arthur Lupton <contact@balupton.com>
 * @license New BSD License <http://creativecommons.org/licenses/BSD/>
 */

// Add the Adapter
var Adapter = module.exports = {
    /**
     * History.Adapter.handlers[uid][eventName] = Array
     */
    handlers: {},

    /**
     * History.Adapter._uid
     * The current element unique identifier
     */
    _uid: 1,

    /**
     * History.Adapter.uid(element)
     * @param {Element} element
     * @return {String} uid
     */
    uid: function(element){
        return element._uid || (element._uid = Adapter._uid++);
    },

    /**
     * History.Adapter.bind(el,event,callback)
     * @param {Element} element
     * @param {String} eventName - custom and standard events
     * @param {Function} callback
     * @return
     */
    bind: function(element,eventName,callback){
        // Prepare
        var uid = Adapter.uid(element);

        // Apply Listener
        Adapter.handlers[uid] = Adapter.handlers[uid] || {};
        Adapter.handlers[uid][eventName] = Adapter.handlers[uid][eventName] || [];
        Adapter.handlers[uid][eventName].push(callback);

        // Bind Global Listener
        element['on'+eventName] = (function(element,eventName){
            return function(event){
                Adapter.trigger(element,eventName,event);
            };
        })(element,eventName);
    },

    /**
     * History.Adapter.trigger(el,event)
     * @param {Element} element
     * @param {String} eventName - custom and standard events
     * @param {Object} event - a object of event data
     * @return
     */
    trigger: function(element,eventName,event){
        // Prepare
        event = event || {};
        var uid = Adapter.uid(element),
            i,n;

        // Apply Listener
        Adapter.handlers[uid] = Adapter.handlers[uid] || {};
        Adapter.handlers[uid][eventName] = Adapter.handlers[uid][eventName] || [];

        // Fire Listeners
        for ( i=0,n=Adapter.handlers[uid][eventName].length; i<n; ++i ) {
            Adapter.handlers[uid][eventName][i].apply(this,[event]);
        }
    },

    /**
     * History.Adapter.extractEventData(key,event,extra)
     * @param {String} key - key for the event data to extract
     * @param {String} event - custom and standard events
     * @return {mixed}
     */
    extractEventData: function(key,event){
        var result = (event && event[key]) || undefined;
        return result;
    },

    /**
     * History.Adapter.onDomLoad(callback)
     * @param {Function} callback
     * @return
     */
    onDomLoad: function(callback) {
        var timeout = window.setTimeout(function(){
            callback();
        },2000);
        window.onload = function(){
            clearTimeout(timeout);
            callback();
        };
    }
};
