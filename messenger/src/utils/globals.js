export function setStateType(type, parentType, taskId) {
  if (type === 'email' || type === 'comment') {
    state.type = type;
    return;
  }

  if (parentType === 'task' && taskId === '') {
    state.type = `${parentType}`;
    return;
  }

  if (parentType === 'task') {
    state.type = `${parentType}-${taskId}`;
    return;
  }

  state.type = `${parentType}-${type}`;
}

export function setStateAssignee(assignee) {
  state.assignee.id = assignee.id;
  state.assignee.title = assignee.text;
}

export function setHtmlTemplate(templateId) {
  state.template = templateId;
}

export function setStateAttachments(attachments) {

  if (attachments.length === 0) {
    state.base64 = {};
  }

  state.attachment = JSON.stringify(attachments.map(file => ({ id: file.id, name: file.name, size: file.size })));
  
  for (let i = 0; i < attachments.length; i++) {
    state.base64[attachments[i].id] = attachments[i].base64.split(',')[1];
  }

}

export function setStateTo(to) {
  // state.to = to.id;

  if (to.length === 0) {
    state.to = '';

    return;
  }

  state.to = to.map(item => item.id).join(',');
}

export function setStateFrom(from) {
  if (from.length === 0) {
    state.from = '';

    return;
  }

  state.from = from.id;
}

export function setStateText(text) {
  state.text = text;
}

export function setStateSubject(subject) {
  state.subject = subject;
}

export function setStateApproval(approval) {
  state.approval = approval;
}

export function setStateDate(start, end) {
  state.start = start;
  state.end = end;
}

export function setFilter(filtersStr) {
  filters = filtersStr;
}

export function setAgendaState(value) {
  agendaState = value;
}

export function setStateQuote(quote) {

  if (quote === null) {
    state.quote = { id: '', type: '' };

    return;
  }

  state.quote.id = quote.id;
  state.quote.type = quote.table;
  // state.quote.type = getParentType(quote.type) + '-' + quote.type + '-' + quote.way;

  // state.quote.text = quote.text;
  // state.quote.date = quote.date;
  
  // state.quote.from = quote.author;
}

export function setEnter(isEnter) {
  isSendByEnter = isEnter;
}

export function setAgendaEvent(id, table, text) {
  state.event.id = id;
  state.event.table = table;
  state.event.text = text;
}

export function clearStateEvent() {
  setAgendaEvent('', '', '');
}

export function translateFilters(value) {
  let filters = {
    'unread': 'Непрочитанные',
    'attachment': 'Есть приложенные файлы',
    'email': 'E-mail',
    'call': 'Звонки телефонии',
    'task': 'Задачи',
    'comment': 'Комментарии',
    'document': 'Документы',

    'event': 'События',
    'event-outgoing-call': 'Исходящий звонок',
    'event-incoming-call': 'Входящий звонок',
    'event-outgoing-message': 'Исходящее сообщение',
    'event-incoming-message': 'Входящее сообщение',
    'event-meeting': 'Встреча',
    'event-other': 'Событие',
    
    'message': 'Сообщения',
    'message-viber': 'Viber',
    'message-vk': 'Вконтакте',
    'message-telegram': 'Telegram'
  }

  return filters[value];
}

export function setStateReminder(seconds, dateUTC) {
  
  if (seconds === 0) {
    state.reminder.seconds = '';
    state.reminder.date = 0;
  } else if (seconds !== -1) {
    state.reminder.seconds = seconds;
    state.reminder.date = 0;
  } else {
    state.reminder.seconds = 0;
    state.reminder.date = dateUTC;
  }
}

export function getParentType(value) {
  if (value === 'vk' || value === 'viber' || value === 'telegram' || value === 'cabinet') {
    return 'message';
  }

  if (value === 'email') {
    return 'email';
  }

  if (value === 'comment') {
    return 'comment';
  }

  if (value === 'task-type') {
    return 'task';
  }

  if (value === "outgoing-call" || value === "incoming-call" || value === "outgoing-message" || value === "incoming-message" || value === "meeting" || value === "other") {
    return 'event';
  }
}
