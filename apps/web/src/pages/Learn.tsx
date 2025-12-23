import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Learn = () => {
  const { t } = useTranslation();
  const [answer, setAnswer] = useState<string | null>(null);

  const handleAnswer = (value: string) => setAnswer(value);
  const feedback = answer === 'option1' ? t('learn.quiz.feedback_correct') : answer ? t('learn.quiz.feedback_wrong') : '';

  return (
    <section className="page learn">
      <h1>{t('learn.title')}</h1>
      <p className="intro">{t('learn.intro')}</p>

      <div className="concept-grid">
        {(['stress', 'balance', 'drought', 'basin'] as const).map((key) => (
          <article key={key} className="card">
            <h3>{t(`learn.concepts.${key}.title`)}</h3>
            <p>{t(`learn.concepts.${key}.text`)}</p>
          </article>
        ))}
      </div>

      <div className="glossary">
        <h2>{t('learn.glossary.title')}</h2>
        <ul>
          {(['index', 'region', 'basin', 'trend'] as const).map((term) => (
            <li key={term}>
              <strong>{t(`learn.glossary.items.${term}`)}:</strong> {t(`learn.glossary.definitions.${term}`)}
            </li>
          ))}
        </ul>
      </div>

      <div className="quiz">
        <h2>{t('learn.quiz.title')}</h2>
        <p>{t('learn.quiz.prompt')}</p>
        <div className="options">
          <button type="button" className={answer === 'option1' ? 'selected' : ''} onClick={() => handleAnswer('option1')}>
            {t('learn.quiz.option1')}
          </button>
          <button type="button" className={answer === 'option2' ? 'selected' : ''} onClick={() => handleAnswer('option2')}>
            {t('learn.quiz.option2')}
          </button>
        </div>
        {feedback && <p className="feedback">{feedback}</p>}
      </div>
    </section>
  );
};

export default Learn;
