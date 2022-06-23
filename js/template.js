import { templateParent, templateChildImg, templateChildComments, templateChildLikes } from './data.js';
import { setDataTemplate } from './setdata-template.js';

/** Function clone template elements
 *  * @return {object}
**/
function cloneTemplateElement() {
  setDataTemplate(templateChildImg, templateChildComments, templateChildLikes);
  const clonedItem = templateChildImg.cloneNode(true);
  templateParent.appendChild(clonedItem);
  return clonedItem;
}
export {cloneTemplateElement};

