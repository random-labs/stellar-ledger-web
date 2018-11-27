
require("regenerator-runtime/runtime");

const StellarApp = require("@ledgerhq/hw-app-str").default;
const Transport = require("@ledgerhq/hw-transport-u2f").default;

StellarLedger = class {

    constructor(path) {
        this.publicKey = null;
        this.path = "44'/148'/0'";

        if (path !== undefined) {
            this.path = path;
        }
    }

    async init() {
        this.transport = await Transport.create();
        this.application = new StellarApp(this.transport);
        this.publicKey = await this.application.getPublicKey(this.path);
        this.publicKey = this.publicKey.publicKey;
    }

    async getPublicKey() {
        if (this.publicKey == null) {
            await this.init();
        }
        return this.publicKey;
    }

    async sign(tx) {
        if (this.publicKey == null) {
            await this.init();
        }

        const signatureBase = tx.signatureBase();
        const result = await this.application.signTransaction(this.path, signatureBase);

        const keypair = StellarBase.Keypair.fromPublicKey(this.publicKey);
        const hint = keypair.signatureHint();
        const decorated = new StellarBase.xdr.DecoratedSignature({
            hint: hint, signature: result.signature
        });
        tx.signatures.push(decorated);
        return tx
    }
};

module.exports = StellarLedger;
