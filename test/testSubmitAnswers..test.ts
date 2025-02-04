import { describe, it, expect, vi } from 'vitest';
import { submitAnswers } from '@/components/Questionnaire.vue'; 

// Mock des fonctions et dépendances
const mockUpdateUserData = vi.fn();
const mockEmit = vi.fn();
const mockValidateInputs = vi.fn(() => true);


vi.mock('@/components/Questionnaire.vue', async () => {
  const actual = await vi.importActual('@/components/Questionnaire.vue');
  return {
    ...actual,
    updateUserData: mockUpdateUserData,
    emit: mockEmit,
    validateInputs: mockValidateInputs,
  };
});

describe('submitAnswers', () => {
  it('devrait appeler updateUserData avant d émettre submitQuestionnaire', async () => {
    mockUpdateUserData.mockResolvedValueOnce(undefined); // Simule un succès async
    
    await submitAnswers();
    
    expect(mockValidateInputs).toHaveBeenCalled(); // Vérifie que validateInputs a été appelé
    expect(mockUpdateUserData).toHaveBeenCalled(); // Vérifie que updateUserData a été appelé
    expect(mockEmit).toHaveBeenCalledWith('submitQuestionnaire'); // Vérifie que l'event est bien émis
    expect(mockUpdateUserData).toHaveBeenCalledBefore(mockEmit); // Vérifie que updateUserData est appelé avant emit
  });

  it('ne doit pas émettre submitQuestionnaire si validateInputs échoue', async () => {
    mockValidateInputs.mockReturnValueOnce(false); // Simule une validation échouée
    
    await submitAnswers();
    
    expect(mockValidateInputs).toHaveBeenCalled();
    expect(mockUpdateUserData).not.toHaveBeenCalled(); // Ne doit pas appeler updateUserData
    expect(mockEmit).not.toHaveBeenCalled(); // Ne doit pas émettre l'événement
  });
});
