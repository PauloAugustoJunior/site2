import { Component, computed, signal, viewChild } from '@angular/core';
import { Icon } from './ui/icon';
import { BriefDialog } from './ui/brief-dialog';
import { Reveal } from './ui/reveal';
@Component({
  selector: 'app-root',
  imports: [Icon, BriefDialog, Reveal],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: { '(document:keydown.escape)': 'menuOpen.set(false)' },
})
export class App {
  readonly menuOpen = signal(false);
  readonly dialog = viewChild.required(BriefDialog);
  readonly year = new Date().getFullYear();
  readonly activeDomain = signal('ai');
  readonly expanded = signal('ai');
  readonly selectedProblem = signal(0);
  readonly services = [
    {
      key: 'ai',
      title: 'Inteligência artificial',
      short: 'IA aplicada',
      icon: 'spark',
      text: 'Inteligência artificial conectada ao trabalho real. Assistentes para consultar informações, chatbots e fluxos que apoiam a rotina do seu time.',
      tags: ['Assistentes de IA', 'Chatbots', 'Busca em documentos'],
      interest: 'IA e chatbots',
      result: 'Informação acessível. Atendimento com contexto.',
    },
    {
      key: 'data',
      title: 'Dados & Business Intelligence',
      short: 'Dados & BI',
      icon: 'database',
      text: 'Organizamos a jornada dos seus dados: da integração de fontes à construção de indicadores, dashboards e análises para apoiar decisões.',
      tags: ['Dashboards', 'Engenharia de dados', 'Analytics'],
      interest: 'Dados e Business Intelligence',
      result: 'Menos planilhas dispersas. Mais clareza para decidir.',
    },
    {
      key: 'dev',
      title: 'Software & aplicativos',
      short: 'Software',
      icon: 'code',
      text: 'Sistemas web, aplicativos e APIs desenvolvidos para o seu processo. Do primeiro protótipo à entrega, com arquitetura e escopo pensados para evoluir.',
      tags: ['Sistemas sob medida', 'Aplicativos', 'APIs'],
      interest: 'Software e aplicativos',
      result: 'Sua operação, com as ferramentas certas.',
    },
    {
      key: 'flow',
      title: 'Automações & integrações',
      short: 'Automação',
      icon: 'flow',
      text: 'Fazemos suas ferramentas conversarem. Conectamos dados, formulários, atendimento e sistemas para reduzir tarefas repetitivas e retrabalho.',
      tags: ['Fluxos automatizados', 'Integrações de sistemas', 'APIs'],
      interest: 'Automações e integrações',
      result: 'Processos conectados. Menos trabalho repetitivo.',
    },
    {
      key: 'web',
      title: 'Sites & presença digital',
      short: 'Sites & web',
      icon: 'globe',
      text: 'Sites institucionais e landing pages responsivas para apresentar sua marca, organizar sua oferta e tornar o contato com sua empresa mais simples.',
      tags: ['Sites institucionais', 'Landing pages', 'Experiência mobile'],
      interest: 'Sites e landing pages',
      result: 'Uma presença digital à altura do seu negócio.',
    },
  ];
  readonly domain = computed(
    () => this.services.find((s) => s.key === this.activeDomain()) ?? this.services[0],
  );
  readonly problems = [
    {
      title: 'Meu time repete tarefas',
      icon: 'clock',
      service: 'Automações e integrações',
      label: 'Automação de processos',
      text: 'Comece mapeando uma rotina repetitiva. Um fluxo conectado pode organizar entradas, atualizar seus sistemas e avisar as pessoas certas.',
      tags: ['Mapear o processo', 'Conectar ferramentas', 'Validar o fluxo'],
    },
    {
      title: 'Meus dados estão espalhados',
      icon: 'database',
      service: 'Dados e Business Intelligence',
      label: 'Dados que fazem sentido',
      text: 'Reúna as fontes importantes e transforme os dados em um painel claro. O ponto de partida é uma decisão que você precisa tomar melhor.',
      tags: ['Conectar as fontes', 'Definir indicadores', 'Visualizar o essencial'],
    },
    {
      title: 'Quero aplicar IA no negócio',
      icon: 'spark',
      service: 'IA e chatbots',
      label: 'IA com objetivo definido',
      text: 'Escolha uma tarefa concreta: consultar documentos, apoiar atendimento ou classificar informações. Avaliamos o contexto antes de propor a ferramenta.',
      tags: ['Escolher um caso de uso', 'Validar a informação', 'Integrar à rotina'],
    },
    {
      title: 'Preciso de uma solução digital',
      icon: 'code',
      service: 'Software e aplicativos',
      label: 'Da ideia à primeira entrega',
      text: 'Comece pela experiência que seu cliente ou sua equipe precisa. Um site, um portal ou um aplicativo pode ser a primeira versão dessa solução.',
      tags: ['Entender os usuários', 'Definir o escopo', 'Construir e testar'],
    },
  ];
  readonly recommendation = computed(() => this.problems[this.selectedProblem()]);
  selectDomain(key: string) {
    this.activeDomain.set(key);
  }
  toggleService(key: string) {
    this.expanded.update((value) => (value === key ? '' : key));
  }
  start(service?: string) {
    this.menuOpen.set(false);
    this.dialog().open(service);
  }
}
