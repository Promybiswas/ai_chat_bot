// Mock data for frontend development before backend is ready

export const mockReports = [
  {
    _id: '1',
    fileName: 'Blood Test Report.pdf',
    uploadedAt: new Date('2024-04-10'),
    processingStatus: 'completed',
    fileSize: 245000
  },
  {
    _id: '2',
    fileName: 'CT Scan Results.jpg',
    uploadedAt: new Date('2024-04-08'),
    processingStatus: 'completed',
    fileSize: 1200000
  },
  {
    _id: '3',
    fileName: 'Lab Work - April 2024.pdf',
    uploadedAt: new Date('2024-04-05'),
    processingStatus: 'processing',
    fileSize: 380000
  }
];

export const mockChatMessages = [
  {
    role: 'user',
    content: 'Can you explain what my blood test results mean?',
    timestamp: new Date(Date.now() - 5 * 60000)
  },
  {
    role: 'assistant',
    content: `Based on your Blood Test Report from April 10, 2024, here's what your results show:

**Hemoglobin (Hb):** 14.2 g/dL - This is within the normal range (13.5-17.5 for men). It indicates your blood cells are carrying oxygen well.

**Red Blood Cell Count (RBC):** 4.8 million/µL - Normal range. Good for oxygen transport.

**White Blood Cell Count (WBC):** 7.2 K/µL - Within normal range (4.5-11). Your immune system appears healthy.

**Platelets:** 250 K/µL - Normal clotting ability.

**Cholesterol:** 195 mg/dL - Borderline desirable (less than 200 is optimal).

All your major values are in healthy ranges! However, you may want to discuss your cholesterol with your doctor if it's been trending upward.

**Important:** This is educational information only and not medical advice. Please consult your healthcare provider for personalized interpretation.`,
    sources: ['1'],
    timestamp: new Date(Date.now() - 3 * 60000)
  },
  {
    role: 'user',
    content: 'Should I be concerned about my cholesterol?',
    timestamp: new Date(Date.now() - 1 * 60000)
  },
  {
    role: 'assistant',
    content: `Your cholesterol at 195 mg/dL is in the borderline desirable range. Here's what this means:

**Cholesterol Levels:**
- Desirable: Less than 200 mg/dL ✓ (You're here!)
- Borderline high: 200-239 mg/dL
- High: 240 mg/dL and above

Since your level is just slightly below 200, you're in good shape. However:

1. **Maintain healthy habits:** Continue a heart-healthy diet, exercise regularly, and avoid smoking
2. **Recheck periodically:** Your doctor may recommend retesting in 1-2 years if it's stable
3. **Family history matters:** If heart disease runs in your family, discuss monitoring with your doctor

Your other lipid markers (if shown in the report) would also help determine overall cardiovascular risk.

**Remember:** This is general health information. Your doctor can provide personalized recommendations based on your complete health profile.`,
    sources: ['1'],
    timestamp: new Date()
  }
];

export const mockChat = {
  _id: 'chat_123',
  title: `Chat ${new Date().toLocaleString()}`,
  conversation: mockChatMessages
};
