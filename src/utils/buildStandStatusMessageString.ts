import { Stand } from '../types/interfaces';

export function buildStandStatusMessageString(stand: Stand) {
  let standTakenString = ' свободен!';
  if (stand.users.length > 0) {
    const standUsersString = stand.users.reduce(
      (acc, user) => acc + `${user.fullName ?? user.username} `,
      ''
    );
    standTakenString = ` занят ${standUsersString}`;
  }

  let standBranchString = stand.branch ? ` с веткой ${stand.branch}` : '';

  return `Стенд номер ${stand.id}${standBranchString}${standTakenString}`;
}
