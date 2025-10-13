import "./Styles/Card.scss";

 interface CardProps{
        icon:string,
        title:string,
        description:string,
        buttonContent:string,
        buttonClassName?: string,
        onButtonClick: () => void,

 }

 const ActionCard = ({
                         icon,
                         title,
                         description,
                         buttonContent,
                         buttonClassName = 'secondary', // Default to secondary if not provided
                         onButtonClick
                     }:CardProps) => {
     return (
         <div className="action-card">
             <div className="card-icon">{icon}</div>
             <h2>{title}</h2>
             <p>{description}</p>
             {buttonContent && (
                 <button
                     className={`action-button ${buttonClassName}`}
                     onClick={onButtonClick}
                 >
                     {buttonContent}
                 </button>
             )}
         </div>
     );
 };

 export default ActionCard;