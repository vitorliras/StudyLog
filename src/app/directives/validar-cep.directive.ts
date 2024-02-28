import { ConsultaCepService } from './../service/consulta-cep.service';
import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable, map } from 'rxjs';

@Directive({
  selector: '[ValidarCep]',
  providers:[{
    provide:NG_ASYNC_VALIDATORS,
    useExisting:ValidarCepDirective,
    multi:true
  }]
})
export class ValidarCepDirective implements AsyncValidator{

  constructor(private ConsultaCepService: ConsultaCepService) { }
  validate(control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const cep = control.value;

    return this.ConsultaCepService.getConsultaCep(cep).pipe(map(
      (resultado: any) => resultado.erro ? {'ValidarCep':true} : null
    ))
  }

}
