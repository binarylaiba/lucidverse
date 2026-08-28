// Automated backend test script using native Node.js fetch

const BASE_URL = 'http://localhost:5000/api';

async function runTests() {
  console.log('🧪 Starting AetherDream Backend Endpoint Tests...\n');

  // Test 1: GET /api/health
  try {
    const res = await fetch(`${BASE_URL}/health`);
    const data = await res.json();
    console.log('✅ [PASS] GET /api/health:', JSON.stringify(data));
  } catch (err) {
    console.error('❌ [FAIL] GET /api/health:', err.message);
  }

  // Test 2: Validation on POST /api/dreams/generate (Invalid short prompt)
  try {
    const res = await fetch(`${BASE_URL}/dreams/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: 'a' }), // Invalid
    });
    const data = await res.json();
    if (res.status === 400 && !data.success) {
      console.log('✅ [PASS] Validation 400 on short prompt:', JSON.stringify(data.error));
    } else {
      console.log('❌ [FAIL] Expected 400 for short prompt, got:', res.status, data);
    }
  } catch (err) {
    console.error('❌ [FAIL] Validation test:', err.message);
  }

  // Test 3: 404 Route handling
  try {
    const res = await fetch(`${BASE_URL}/invalid-route-xyz`);
    const data = await res.json();
    if (res.status === 404 && !data.success) {
      console.log('✅ [PASS] Centralized 404 Handler:', JSON.stringify(data.error));
    } else {
      console.log('❌ [FAIL] Expected 404, got:', res.status, data);
    }
  } catch (err) {
    console.error('❌ [FAIL] 404 test:', err.message);
  }

  // Test 4: Missing Supabase database handling
  try {
    const res = await fetch(`${BASE_URL}/dimensions`);
    const data = await res.json();
    console.log(`ℹ️ [INFO] GET /api/dimensions (Status: ${res.status}):`, JSON.stringify(data.error || data.data));
  } catch (err) {
    console.error('❌ [FAIL] GET /api/dimensions:', err.message);
  }

  console.log('\n✨ Test suite finished.');
}

runTests();
