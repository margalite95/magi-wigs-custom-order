const form = document.getElementById('wigForm');
const steps = [...document.querySelectorAll('.form-step')];
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const progressBar = document.getElementById('progressBar');
const summaryCard = document.getElementById('summaryCard');
const summaryContent = document.getElementById('summaryContent');
const whatsappBtn = document.getElementById('whatsappBtn');
const editBtn = document.getElementById('editBtn');
let currentStep = 0;

const labels = {
  fullName:'שם מלא', phone:'טלפון', city:'עיר', preferredDate:'מועד רצוי',
  length:'אורך', style:'סגנון', density:'צפיפות', topType:'מבנה עליון',
  baseColor:'צבע בסיס', highlights:'גוונים', rootColor:'צבע שורש', colorNotes:'הערת צבע',
  movement:'תחילת התנועה', parting:'שביל', babyHair:'בייבי־הייר', budget:'תקציב', notes:'הערות נוספות'
};

function showStep(index){
  steps.forEach((step,i)=>step.classList.toggle('active',i===index));
  prevBtn.disabled=index===0;
  nextBtn.classList.toggle('hidden',index===steps.length-1);
  submitBtn.classList.toggle('hidden',index!==steps.length-1);
  progressBar.style.width=`${((index+1)/steps.length)*100}%`;
}
function validateStep(){
  const required=[...steps[currentStep].querySelectorAll('[required]')];
  for(const field of required){if(!field.checkValidity()){field.reportValidity();return false;}}
  return true;
}
nextBtn.addEventListener('click',()=>{if(validateStep()&&currentStep<steps.length-1){currentStep++;showStep(currentStep);}});
prevBtn.addEventListener('click',()=>{if(currentStep>0){currentStep--;showStep(currentStep);}});

form.addEventListener('submit',(e)=>{
  e.preventDefault();
  if(!validateStep())return;
  const data=Object.fromEntries(new FormData(form).entries());
  summaryContent.innerHTML='';
  const lines=['שלום, אשמח לקבל פרטים על הזמנת פאה בהתאמה אישית:'];
  Object.entries(data).forEach(([key,value])=>{
    if(!value)return;
    const row=document.createElement('div');
    row.className='summary-row';
    row.innerHTML=`<small>${labels[key]||key}</small><strong>${value}</strong>`;
    summaryContent.appendChild(row);
    lines.push(`${labels[key]||key}: ${value}`);
  });
  lines.push('ידוע לי ששליחת הפרטים אינה מחייבת רכישה.');
  whatsappBtn.href=`https://wa.me/972586660460?text=${encodeURIComponent(lines.join('\n'))}`;
  form.classList.add('hidden');
  summaryCard.classList.remove('hidden');
  summaryCard.scrollIntoView({behavior:'smooth',block:'start'});
});
editBtn.addEventListener('click',()=>{summaryCard.classList.add('hidden');form.classList.remove('hidden');currentStep=0;showStep(currentStep);form.scrollIntoView({behavior:'smooth'});});
showStep(currentStep);
