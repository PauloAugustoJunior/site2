import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('Exploração de desafios', () => {
  it('oferece um caminho coerente com a necessidade selecionada', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    element.querySelectorAll<HTMLButtonElement>('.problem-options button')[1].click();
    await fixture.whenStable();
    expect(element.querySelector('.recommendation h3')?.textContent).toContain(
      'Dados que fazem sentido',
    );
    expect(element.querySelector('.recommendation p')?.textContent).toContain('fontes importantes');
  });
  it('expõe apenas o conteúdo da especialidade aberta', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    element.querySelectorAll<HTMLButtonElement>('.service-row h3 button')[2].click();
    await fixture.whenStable();
    expect(element.querySelector('#service-dev')?.hasAttribute('hidden')).toBe(false);
    expect(element.querySelector('#service-ai')?.hasAttribute('hidden')).toBe(true);
  });
});
