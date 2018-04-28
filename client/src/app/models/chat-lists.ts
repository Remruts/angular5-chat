import {User} from './user';
import {Group} from './group';

export class ChatLists {
	users: {[id: string] : User};
	groups: Group[];
}
