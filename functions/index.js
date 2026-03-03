// ============================================================
// functions/index.js
// Cloud Functions for Firebase - Lenguas Indigenas de Colombia
// Prueba de despliegue en Google Cloud Platform
// ================================================

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.getLenguas = functions.https.onCall(async (data, context) => {
    const snapshot = await admin.firestore().collection('lenguas').get();
    return snapshot.docs.map(doc => doc.data());
});

exports.addLengua = functions.https.onCall(async (data, context) => {
    if (!context.auth) throw new functions.https.HttpsError('unauthenticated', 'Login required');
    const ref = await admin.firestore().collection('lenguas').add({
          ...data,
          timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
    return { id: ref.id };
});

exports.batchUpdate = functions.https.onCall(async (data, context) => {
    const batch = admin.firestore().batch();
    await batch.commit();
    return { success: true };
});
