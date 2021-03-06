"use strict";
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Subscription_1 = require("rxjs/Subscription");
/**
 * Subscription subclass with the ability to remove itself
 * from a Relay's internal list of observers when unsubscribe is called.
 * @class ReplaySubscription<T>
 */
class RelaySubscription extends Subscription_1.Subscription {
    constructor(relay, subscriber) {
        super();
        this.subscriber = subscriber;
        this.closed = false;
        this.relay = relay;
    }
    unsubscribe() {
        if (this.closed) {
            return;
        }
        this.closed = true;
        const relay = this.relay;
        const observers = relay.observers;
        this.relay = null;
        if (!observers || observers.length === 0) {
            return;
        }
        const subscriberIndex = observers.indexOf(this.subscriber);
        if (subscriberIndex !== -1) {
            observers.splice(subscriberIndex, 1);
        }
    }
}
exports.RelaySubscription = RelaySubscription;
//# sourceMappingURL=RelaySubscription.js.map