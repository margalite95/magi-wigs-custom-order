const form=document.getElementById('wigForm');
const styleField=document.getElementById('styleField');
const cards=[...document.querySelectorAll('.look-card')];

cards.forEach(card=>card.addEventListener('click',()=>{
  cards.forEach(item=>item.classList.remove('selected'));
  card.classList.add('selected');
  styleField.value=card.dataset.style;
  document.getElementById('order').scrollIntoView({behavior:'smooth'});
}));

form.addEventListener('submit',event=>{
  event.preventDefault();
  if(!form.reportValidity())return;
  const data=Object.fromEntries(new FormData(form).entries());
  const labels={fullName:'שם',phone:'טלפון',length:'אורך',style:'סגנון',baseColor:'צבע בסיס',highlights:'גוונים',notes:'הערות'};
  const lines=['שלום, אשמח לקבל פרטים על פאה בהתאמה אישית:'];
  Object.entries(data).forEach(([key,value])=>{if(value)lines.push(`${labels[key]||key}: ${value}`)});
  lines.push('ידוע לי ששליחת הפרטים אינה מחייבת רכישה.');
  window.open(`https://wa.me/972586660460?text=${encodeURIComponent(lines.join('\n'))}`,'_blank','noopener');
});
