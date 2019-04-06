import Route from '@ember/routing/route';
import { authenticatedRoute } from '@spomoda/web/src/decorators/authenticated-route';

@authenticatedRoute
export default class SuggestRoute extends Route {

}
