const nodecg = require('./utils/nodecg-api-context').get();

// Current host is stored in here. Defaults to empty string.
const currentHost = nodecg.Replicant('currentHost', {defaultValue: ''});

// Listen for nodeCG change host message, then handle.
nodecg.listenFor('changeHost', (hostName, callback) => {
	try {
		currentHost.value = hostName;
		nodecg.log.info('Host name changed to %s.', hostName)
		if (callback) {
			callback();
		}
	} catch (err) {
        nodecg.log.error("Got bad changeHost hostName %s", hostName);
	}
});
